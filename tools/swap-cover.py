"""Replace page 1 of a book PDF with a drawn cover page.

    python swap-cover.py <book.pdf> <cover.pdf>

Called by tools/build.mjs. Replaces rather than inserts, so the page count and
the printed footer numbers the book already carries stay correct.

PyMuPDF is used because it is already installed and was already what the
previous cover pipeline (docs/ebook/covers/make-booklet-covers.py) relied on.
"""

import sys
from pathlib import Path

import fitz


def main():
    if len(sys.argv) != 3:
        sys.exit("usage: swap-cover.py <book.pdf> <cover.pdf>")

    book_path, cover_path = Path(sys.argv[1]), Path(sys.argv[2])
    if not book_path.exists():
        sys.exit(f"missing book pdf: {book_path}")
    if not cover_path.exists():
        sys.exit(f"missing cover pdf: {cover_path}")

    book = fitz.open(book_path)
    cover = fitz.open(cover_path)

    if cover.page_count != 1:
        sys.exit(f"cover must be exactly 1 page, got {cover.page_count}")
    if book.page_count < 1:
        sys.exit("book pdf has no pages")

    # Put the cover in front, then drop the plain cover that was page 1.
    book.insert_pdf(cover, from_page=0, to_page=0, start_at=0)
    book.delete_page(1)

    # Saving over an open file is not allowed, so write beside it and swap.
    tmp = book_path.with_suffix(".tmp.pdf")
    book.save(tmp, garbage=4, deflate=True)
    book.close()
    cover.close()
    tmp.replace(book_path)


if __name__ == "__main__":
    main()
