# Arsitektur Animasi Scroll Bidirectional Abhinaya UNY Web

## Ringkasan Konsep
Sistem animasi scroll di situs Abhinaya UNY menggunakan pendekatan **native, GPU-accelerated bidirectional IntersectionObserver**. Tujuannya adalah menciptakan efek scroll yang sangat responsif, interaktif, dan modern:
- **Saat Scroll ke Bawah (Scrolling Down)**:
  - Elemen section di bawah yang baru memasuki layar (*viewport*) akan **Fade In** dan bergeser perlahan ke atas (`translateY(0)`).
  - Elemen section di atas yang meninggalkan batas atas layar akan **Fade Out** secara halus ke arah atas (`translateY(-28px)`).
- **Saat Scroll ke Atas (Scrolling Up)**:
  - Elemen section di atas yang kembali memasuki viewport akan **Fade In** kembali ke posisi normal.
  - Elemen section di bawah yang keluar dari batas bawah viewport akan **Fade Out** dan kembali dipersiapkan (*re-primed*) untuk animasi scroll berikutnya.

---

## Spesifikasi State & Kelas CSS

1. **State 1: Hidden (Bawah Layar / Initial)**
   - Kelas: `.reveal-on-scroll`
   - Properti:
     ```css
     opacity: 0;
     transform: translateY(32px) scale(0.985);
     transition: opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1),
                 transform 0.75s cubic-bezier(0.16, 1, 0.3, 1);
     will-change: opacity, transform;
     ```

2. **State 2: Revealed (Di Dalam Viewport)**
   - Kelas: `.reveal-on-scroll.is-revealed`
   - Properti:
     ```css
     opacity: 1 !important;
     transform: translateY(0) scale(1) !important;
     ```

3. **State 3: Scrolled Above (Keluar di Atas Layar)**
   - Kelas: `.reveal-on-scroll.is-scrolled-above`
   - Properti:
     ```css
     opacity: 0 !important;
     transform: translateY(-28px) scale(0.985) !important;
     transition: opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1),
                 transform 0.65s cubic-bezier(0.16, 1, 0.3, 1);
     ```

---

## Logika IntersectionObserver (`ScrollObserver.tsx`)
```typescript
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const target = entry.target as HTMLElement;
      const rect = entry.boundingClientRect;

      if (entry.isIntersecting) {
        target.classList.add('is-revealed');
        target.classList.remove('is-scrolled-above');
      } else {
        if (rect.bottom < 0) {
          // Keluar melewati atas viewport -> fade out ke atas
          target.classList.remove('is-revealed');
          target.classList.add('is-scrolled-above');
        } else if (rect.top > window.innerHeight) {
          // Berada di bawah viewport -> re-prime untuk scroll ke bawah
          target.classList.remove('is-revealed');
          target.classList.remove('is-scrolled-above');
        }
      }
    });
  },
  {
    root: null,
    rootMargin: '10px 0px 10px 0px',
    threshold: 0.05,
  }
);
```

---

## Aksesibilitas (`prefers-reduced-motion`)
Untuk pengguna yang mengaktifkan opsi hemat gerakan di OS (`prefers-reduced-motion: reduce`), semua section otomatis dipertahankan pada opacity 1 dan transform normal tanpa animasi yang mengganggu kenyamanan penglihatan.
