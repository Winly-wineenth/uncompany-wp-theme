#!/usr/bin/env python3
"""PNG の上部を指定サイズに切り出す小さなユーティリティ（依存パッケージなし）。

ヘッドレス Chromium のスクリーンショットは --window-size と同じ大きさで出力され、
ウィンドウ枠の分だけ縦に余白が付く。その余白を落として 2500x843 ちょうどにするために使う。

    python3 pngcrop.py <file.png> <width> <height>
"""
import sys, zlib, struct


def read_png(path):
    d = open(path, 'rb').read()
    pos, idat = 8, b''
    w = h = ct = None
    while pos < len(d):
        ln = struct.unpack('>I', d[pos:pos + 4])[0]
        typ = d[pos + 4:pos + 8]
        data = d[pos + 8:pos + 8 + ln]
        if typ == b'IHDR':
            w, h, bd, ct = struct.unpack('>IIBB', data[:10])
            if bd != 8 or ct not in (2, 6):
                raise SystemExit('unsupported PNG format')
        elif typ == b'IDAT':
            idat += data
        pos += 12 + ln
    ch = 4 if ct == 6 else 3
    raw = zlib.decompress(idat)
    stride = w * ch
    out = bytearray()
    prev = bytearray(stride)
    i = 0
    for _ in range(h):
        f = raw[i]; i += 1
        line = bytearray(raw[i:i + stride]); i += stride
        if f:
            for x in range(stride):
                a = line[x - ch] if x >= ch else 0
                b = prev[x]
                c = prev[x - ch] if x >= ch else 0
                if f == 1:   line[x] = (line[x] + a) & 255
                elif f == 2: line[x] = (line[x] + b) & 255
                elif f == 3: line[x] = (line[x] + (a + b) // 2) & 255
                elif f == 4:
                    p = a + b - c
                    pa, pb, pc = abs(p - a), abs(p - b), abs(p - c)
                    line[x] = (line[x] + (a if pa <= pb and pa <= pc else b if pb <= pc else c)) & 255
        out += line
        prev = line
    return w, h, ch, bytes(out)


def write_png(path, w, h, ch, px):
    stride = w * ch
    raw = bytearray()
    for y in range(h):
        raw.append(0)
        raw += px[y * stride:(y + 1) * stride]

    def chunk(typ, data):
        return (struct.pack('>I', len(data)) + typ + data
                + struct.pack('>I', zlib.crc32(typ + data) & 0xffffffff))

    body = (b'\x89PNG\r\n\x1a\n'
            + chunk(b'IHDR', struct.pack('>IIBBBBB', w, h, 8, 6 if ch == 4 else 2, 0, 0, 0))
            + chunk(b'IDAT', zlib.compress(bytes(raw), 9))
            + chunk(b'IEND', b''))
    open(path, 'wb').write(body)


def main():
    path, tw, th = sys.argv[1], int(sys.argv[2]), int(sys.argv[3])
    w, h, ch, px = read_png(path)
    if (w, h) == (tw, th):
        print(f'{path}: {w}x{h} (crop 不要)')
        return
    stride = w * ch
    out = bytearray()
    for y in range(th):
        out += px[y * stride:y * stride + tw * ch]
    write_png(path, tw, th, ch, bytes(out))
    print(f'{path}: {w}x{h} -> {tw}x{th}')


if __name__ == '__main__':
    main()
