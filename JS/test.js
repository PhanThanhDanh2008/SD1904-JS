alert("Chào mừng bạn đến với ứng dụng đọc văn bản tiếng Việt!");

// Lấy phần tử input và button
const input = document.querySelector('input');
const button = document.getElementById('btn');

// Biến lưu trữ giọng tiếng Việt
let vietnameseVoice = null;

// Hàm load giọng nói
const loadVoices = () => {
  const voices = speechSynthesis.getVoices();

  // In log để kiểm tra có giọng nào sẵn
  console.log("Danh sách giọng có sẵn:");
  voices.forEach(voice => console.log(`${voice.name} (${voice.lang})`));

  // Tìm giọng có mã ngôn ngữ là 'vi-VN'
  vietnameseVoice = voices.find(voice => voice.lang === 'vi-VN');

  if (!vietnameseVoice) {
    alert("Không tìm thấy giọng nói tiếng Việt. Hãy chắc chắn bạn đã cài đặt và khởi động lại máy.");
  }
};

// Hàm chuyển văn bản thành giọng nói
const textToSpeech = () => {
  const text = input.value.trim();
  if (!text) return alert("Vui lòng nhập nội dung cần đọc!");

  const utterance = new SpeechSynthesisUtterance(text);

  // Nếu có giọng tiếng Việt thì dùng
  if (vietnameseVoice) {
    utterance.voice = vietnameseVoice;
  }

  utterance.rate = 1;    // Tốc độ đọc (0.1 -> 10)
  utterance.pitch = 1;   // Cao độ (0 -> 2)

  speechSynthesis.speak(utterance);
};

// Đảm bảo load xong danh sách voice mới gán sự kiện
speechSynthesis.onvoiceschanged = () => {
  loadVoices();
  button.addEventListener('click', textToSpeech);
};
