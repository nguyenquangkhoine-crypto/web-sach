import { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function BookShelfLandingPage() {
  const [selectedBook, setSelectedBook] = useState(null);
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [pdfWidth, setPdfWidth] = useState(900);
  const readerRef = useRef(null);

  const books = [
    {
      title: "Đắc nhân tâm",
      author: "Dale Carnegie",
      description:
        "Những bài học sâu sắc về giao tiếp, ứng xử và thấu hiểu con người – cuốn sách giúp mỗi người hoàn thiện bản thân và xây dựng các mối quan hệ tốt đẹp hơn.",
      cover:
        "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=800&q=80",
      readLink:
        "https://drive.google.com/file/d/1PO4-8ykqK8wI0bgRYcSSPU6FXCHGPcxp/view?usp=sharing",
      pdfLink:
        "https://raw.githubusercontent.com/nguyenquangkhoine-crypto/dacnhantam/main/dacnhantam.pdf",
    },
  ];

  const heroBackground =
    "https://drive.google.com/thumbnail?id=1QXh5jiSQvidwvceYBWagYfjQA-HmvLYw&sz=w1600";

  useEffect(() => {
    if (!selectedBook && books.length > 0) {
      setSelectedBook(books[0]);
    }
  }, []);

  useEffect(() => {
    const updateWidth = () => {
      const width = readerRef.current?.clientWidth || 900;
      setPdfWidth(Math.min(Math.max(width - 32, 280), 1000));
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, [selectedBook]);

  const handleReadBook = (book) => {
    setSelectedBook(book);
    setPageNumber(1);
    readerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  const toggleFullScreen = async () => {
    const panel = document.getElementById("pdf-reader-panel");
    if (!panel) return;
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else if (panel.requestFullscreen) {
        await panel.requestFullscreen();
      } else if (panel.webkitRequestFullscreen) {
        panel.webkitRequestFullscreen();
      } else if (panel.msRequestFullscreen) {
        panel.msRequestFullscreen();
      }
    } catch (e) {
      console.error("Fullscreen error", e);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-orange-50 text-slate-800">
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBackground})` }}
        />
        <div className="absolute inset-0 bg-slate-900/65" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-orange-900/35" />

        <div className="relative mx-auto max-w-6xl px-6 py-24 md:px-10 md:py-36">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex rounded-full bg-white/15 px-4 py-2 text-sm font-medium text-white shadow backdrop-blur-sm">
              Trường THPT Số 1 Phù Cát • Lớp H3-K58
            </div>
            <h1 className="text-4xl font-bold leading-tight text-white drop-shadow md:text-6xl">
              Trang sách mở lối – Ước mơ vươn xa
            </h1>
            <p className="mt-5 text-lg leading-8 text-white/90 md:text-xl">
              Giữa những trang sách lặng thầm là cả một thế giới rộng lớn đang
              chờ được khám phá. Chạm vào một cuốn sách, mở ra một hành trình
              tri thức.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#reader"
                className="rounded-2xl bg-orange-500 px-6 py-3 font-semibold text-white shadow-lg transition hover:scale-[1.02]"
              >
                Bắt đầu đọc ngay
              </a>
              <a
                href="#books"
                className="rounded-2xl border border-white/30 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur-sm transition hover:scale-[1.02]"
              >
                Danh mục sách
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-10 md:px-10">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl bg-white p-6 shadow-lg">
            <div className="text-3xl">📚</div>
            <h2 className="mt-3 text-xl font-bold">Lan tỏa văn hóa đọc</h2>
            <p className="mt-2 text-slate-600">
              Kệ sách kết nối mọi người với tri thức.
            </p>
          </div>
          <div className="rounded-3xl bg-white p-6 shadow-lg">
            <div className="text-3xl">✨</div>
            <h2 className="mt-3 text-xl font-bold">Trải nghiệm hiện đại</h2>
            <p className="mt-2 text-slate-600">
              Đọc trực tuyến mượt mà, hỗ trợ phóng to.
            </p>
          </div>
          <div className="rounded-3xl bg-white p-6 shadow-lg">
            <div className="text-3xl">🌱</div>
            <h2 className="mt-3 text-xl font-bold">Nuôi dưỡng tương lai</h2>
            <p className="mt-2 text-slate-600">
              Bồi đắp lòng nhân ái và khát vọng vươn lên.
            </p>
          </div>
        </div>
      </section>

      <section
        id="reader"
        ref={readerRef}
        className="mx-auto max-w-6xl px-6 py-10 md:px-10"
      >
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">
            Trình đọc sách trực tuyến
          </p>
          <h2 className="mt-2 text-3xl font-bold">Màn hình hiển thị sách</h2>
        </div>

        <div
          id="pdf-reader-panel"
          className="overflow-hidden rounded-[2rem] bg-slate-950 shadow-2xl"
        >
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 px-6 py-4 text-white">
            <div className="flex items-center gap-3">
              <span className="flex h-3 w-3 rounded-full bg-red-500"></span>
              <span className="flex h-3 w-3 rounded-full bg-yellow-500"></span>
              <span className="flex h-3 w-3 rounded-full bg-green-500"></span>
              <h2 className="ml-4 text-lg font-medium italic text-slate-300">
                {selectedBook
                  ? `Đang đọc: ${selectedBook.title}`
                  : "Vui lòng chọn sách bên dưới"}
              </h2>
            </div>

            {selectedBook && (
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setPageNumber((p) => Math.max(p - 1, 1))}
                  disabled={pageNumber <= 1}
                  className="rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Trang trước
                </button>
                <button
                  onClick={() =>
                    setPageNumber((p) => Math.min(p + 1, numPages || 1))
                  }
                  disabled={numPages === 0 || pageNumber >= numPages}
                  className="rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Trang sau
                </button>
                <button
                  onClick={toggleFullScreen}
                  className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-500"
                  type="button"
                >
                  Toàn màn hình
                </button>
              </div>
            )}
          </div>

          <div className="bg-slate-900 p-2 md:p-4">
            {selectedBook ? (
              <div className="rounded-[1.25rem] bg-slate-800 p-3 md:p-4">
                <div className="mb-3 flex items-center justify-between text-sm text-slate-300">
                  <span>
                    Trang {pageNumber} / {numPages || "..."}
                  </span>
                  <span>Chế độ đọc trực tiếp bằng PDF.js</span>
                </div>
                <div className="overflow-auto rounded-[1rem] bg-slate-700 p-2">
                  <Document
                    file={selectedBook.pdfLink}
                    onLoadSuccess={onDocumentLoadSuccess}
                    loading={
                      <div className="flex h-[60vh] items-center justify-center text-white">
                        Đang tải sách...
                      </div>
                    }
                    error={
                      <div className="flex h-[60vh] items-center justify-center px-6 text-center text-white">
                        Không tải được PDF. Hãy kiểm tra lại link pdfLink.
                      </div>
                    }
                    onLoadError={(error) =>
                      console.error("Lỗi tải PDF:", error)
                    }
                  >
                    <Page
                      pageNumber={pageNumber}
                      width={pdfWidth}
                      renderTextLayer={false}
                      renderAnnotationLayer={false}
                      loading={
                        <div className="flex h-[60vh] items-center justify-center text-white">
                          Đang hiển thị trang...
                        </div>
                      }
                    />
                  </Document>
                </div>
              </div>
            ) : (
              <div className="flex h-[50vh] flex-col items-center justify-center rounded-[1.25rem] border border-dashed border-white/10 bg-slate-900 px-6 text-center">
                <div className="mb-4 text-5xl">📖</div>
                <p className="max-w-xs text-slate-400">
                  Cuộn xuống và chọn nút{" "}
                  <span className="text-orange-400">“Đọc ngay trên trang”</span>{" "}
                  để bắt đầu hành trình tri thức.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section id="books" className="mx-auto max-w-6xl px-6 py-10 md:px-10">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">
            Tủ sách lớp H3-K58
          </p>
          <h2 className="mt-2 text-3xl font-bold md:text-4xl">
            Chọn cuốn sách bạn yêu thích
          </h2>
        </div>

        <div className="grid gap-8">
          {books.map((book) => (
            <div
              key={book.title}
              className="group grid overflow-hidden rounded-[2rem] bg-white shadow-lg transition-all hover:shadow-2xl md:grid-cols-[280px_1fr]"
            >
              <div className="overflow-hidden">
                <img
                  src={book.cover}
                  alt={book.title}
                  className="h-full min-h-[300px] w-full object-cover transition duration-500 group-hover:scale-110"
                />
              </div>
              <div className="flex flex-col justify-center p-8">
                <p className="text-sm font-medium uppercase tracking-wide text-orange-500">
                  {book.author}
                </p>
                <h3 className="mt-2 text-3xl font-bold text-slate-800">
                  {book.title}
                </h3>
                <p className="mt-4 leading-relaxed text-slate-600">
                  {book.description}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <button
                    onClick={() => handleReadBook(book)}
                    className="rounded-2xl bg-orange-500 px-8 py-3 font-bold text-white shadow-lg shadow-orange-200 transition hover:bg-orange-600 hover:scale-105"
                  >
                    Đọc ngay trên trang
                  </button>
                  <a
                    href={book.readLink}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-2xl border border-slate-200 px-8 py-3 font-semibold text-slate-600 transition hover:bg-slate-50"
                  >
                    Mở file gốc
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-orange-100 px-6 py-12 text-center text-slate-400">
        <p className="text-sm">
          © 2024 H3-K58 Phù Cát 1 • Dự án văn hóa đọc số
        </p>
      </footer>
    </div>
  );
}
