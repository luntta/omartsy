#!/usr/bin/env python3
"""Builds src/assets/fonts/omartsy-glyphs.woff2: just the Nerd Font icons the site uses.

The code points are read from src/lib/glyphs.ts and from `content: '\\F0AD'`
escapes in the styles, so adding a glyph there and rerunning this is enough:

    uvx --from 'fonttools[woff]' python scripts/subset-glyphs.py [JetBrainsMonoNerdFont-Regular.ttf]

Omarchy ships JetBrainsMono Nerd Font, so the default path works on an Omarchy machine.
"""

import pathlib
import re
import sys

from fontTools import subset
from fontTools.ttLib import TTFont

root = pathlib.Path(__file__).resolve().parent.parent
source = sys.argv[1] if len(sys.argv) > 1 else "/usr/share/fonts/TTF/JetBrainsMonoNerdFont-Regular.ttf"
output = root / "src/assets/fonts/omartsy-glyphs.woff2"

codepoints = {int(h, 16) for h in re.findall(r"\\u\{([0-9A-Fa-f]+)\}", (root / "src/lib/glyphs.ts").read_text())}
for path in [*root.glob("src/**/*.css"), *root.glob("src/**/*.astro")]:
    codepoints |= {int(h, 16) for h in re.findall(r"content:\s*'\\([0-9A-Fa-f]{4,6})'", path.read_text())}

options = subset.Options()
options.layout_features = []
options.hinting = False
options.desubroutinize = True
options.name_IDs = [0, 13, 14]  # keep the copyright and license records

font = TTFont(source)
subsetter = subset.Subsetter(options)
subsetter.populate(unicodes=codepoints)
subsetter.subset(font)

# Nerd Font icons are drawn wider than the single cell they advance by, so they
# spill into the next character. Give each one the room it actually draws in.
glyf, hmtx = font["glyf"], font["hmtx"]
for name in font.getGlyphOrder():
    glyph = glyf[name]
    if glyph.numberOfContours and hasattr(glyph, "xMax"):
        advance, lsb = hmtx[name]
        hmtx[name] = (max(advance, glyph.xMax + 90), lsb)

font.flavor = "woff2"
font.save(output)
print(f"Wrote {len(codepoints)} glyphs to {output.relative_to(root)} ({output.stat().st_size} bytes)")
