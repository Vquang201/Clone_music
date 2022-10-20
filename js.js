const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const playList = $('.playlist')
const cd = $('.cd')
const player = $('.player')
const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const progress = $('#progress')
const playBtn = $('.btn-toggle-play')
const nextBtn = $('.btn-next')
const prevBtn = $('.btn-prev')
const repeatBtn = $('.btn-repeat')
const randomBtn = $('.btn-random')
const app = {
  currentIndex: 0,
  isPlaying: false,
  isRepeat: false,
  isRandom: false,
  songs: [
    {
      name: "Hai Mươi Hai (22)",
      singer: "Hứa Kim Tuyền, AMEE",
      path: "./audio/HaiMuoiHai22.mp3",
      image: "./img/haimuoihai.jpg",
    },
    {
      name: "Em Băng Qua Remix",
      singer: "Lập Nguyên",
      path: "./audio/embangqua.mp3",
      image: "./img/embangqua.jpg",
    },
    {
      name: "Tình Yêu Màu Hồng Remix",
      singer: "Hồ Văn Quý, Xám",
      path: "./audio/tinhyeumauhong.mp3",
      image: "./img/tinhyeumauhong.jpg",
    },
    {
      name: "Tình Ka (WRC Remix)",
      singer: "DanhKa",
      path: "./audio/tinhka.mp3",
      image: "./img/tinhka.jpg",
    },
    {
      name: "Hẹn Ngày Mai Yêu",
      singer: "Long Cao",
      path: "./audio/henngaymaiyeu.mp3",
      image: "./img/henngaymaiyeu.jpg",
    },
    {
      name: "Nhìn Vào Đôi Mắt Này",
      singer: "Long Cao",
      path: "./audio/nhinvaodoimatnay.mp3",
      image: "./img/nhinvaodoimatnay.jpg",
    },
    {
      name: "Sài Gòn Đau Lòng Quá (TYD Remix)",
      singer: "Hoàng Duyên, Hứa Kim Tuyền",
      path: "./audio/saigondaulongqua.mp3",
      image: "./img/saigondaulongqua.jpg",
    },
    {
      name: "2 Phút Hơn (Masew Remix)",
      singer: "Pháo, Masew",
      path: "./audio/2phuthon.mp3",
      image: "./img/2phuthon.jpg",
    },
    {
      name: "Kẹo Bông Gòn (Orinn EDM Remix)",
      singer: "H2K, KN",
      path: "./audio/keobonggon.mp3",
      image: "./img/keobonggon.jpg",
    },
    {
      name: "Anh Không Tha Thứ",
      singer: "Đình Dũng, ACV",
      path: "./audio/anhkhongthathu.mp3",
      image: "./img/anhkhongthathu.jpg",
    },
    {
      name: "Yêu Vội Vàng (Remix)",
      singer: "Lê Bảo Bình",
      path: "./audio/yeuvoivang.mp3",
      image: "./img/yeuvoivang.jpg",
    },
    {
      name: "Để Cho Anh Khóc (Remix)",
      singer: "Lê Bảo Bình",
      path: "./audio/dechoanhkhoc.mp3",
      image: "./img/dechoanhkhoc.jpg",
    },
    {
      name: "Thiên Đường",
      singer: "Wowy, Phạm Đăng Anh Thư",
      path: "./audio/thiendang.mp3",
      image: "./img/thiendang.jpg",
    },
    {
      name: "Khách Quan Không Thể Được",
      singer: "客官不可以 - Từ Lương (Liang Xu), Tiểu Lăng",
      path: "./audio/khachquankhongtheduoc.mp3",
      image: "./img/khachquankhongtheduoc.jpg",
    },
    {
      name: "Kiêu Ngạo 嚣张",
      singer: "xiaozhang",
      path: "./audio/kieungao.mp3",
      image: "./img/kieungao.jpg",
    },

  ],

  defineProperties: function () {
    Object.defineProperty(this, 'currentSong', {
      get: function () {
        return this.songs[this.currentIndex]
      }
    })
  },

  // cách khác ngoài đinh nghĩa cái currentSong
  // currentSong : function () {
  //   return this.songs[this.currentIndex]
  // },
  // có thể lấy currenSong thế này , nhưng khi gọi lại phải
  // this.currentSong() vì nó là 1 key
  // (không thể gọi this.currentSong như 1 biến ta đã định nghĩa)

  // xử lý các sự kiện
  handleEvents: function () {
    const cdWidth = cd.offsetWidth
    // xử lý cd quay
    const cdThumbAnimate = cdThumb.animate([
      { transform: 'rotate(360deg)' }
    ], {
      duration: 11000,
      iterations: Infinity
    })
    // mặc định cho pause quay
    cdThumbAnimate.pause()

    // xử lý phóng to thu nhỏ ảnh
    document.onscroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop
      const newCdWidth = cdWidth - scrollTop
      cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0
      cd.style.opacity = newCdWidth / cdWidth

    }

    // lấy phần trăm hiện tại của bài hát
    audio.ontimeupdate = () => {
      if (audio.duration) {
        const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
        progress.value = progressPercent
        // if (progressPercent === 100 ) {
        //   this.nextSong()
        //   audio.play()
        // }
        // sử dụng onended thay vì xét cứng auto next
      }
    }

    // xử lý khi click play
    playBtn.onclick = () => {
      // cái này không thể sử dụng this , sử dụng app
      // nếu app được play   
      if (this.isPlaying) {
        audio.pause()
        player.classList.remove('playing')
        this.isPlaying = false
        cdThumbAnimate.pause()
      } else {
        audio.play()
        player.classList.add('playing')
        this.isPlaying = true
        cdThumbAnimate.play()
      }
    }

    // xử lý khi tua song 
    progress.onchange = (e) => {
      const seekTime = audio.duration / 100 * e.target.value
      audio.currentTime = seekTime
    }

    // khi click thì next bài tiêps theo
    nextBtn.onclick = () => {    
      // khi next song buộc phải đang chơi nhạc
      this.isPlaying = false 
      playBtn.click()

      if (app.isRandom) { // nếu cái random đc bật = true thì random bài hát
        app.playRandomSong()
        audio.play()
        // render bài hát lại mới chạy điều kiện trong render() để active playList
        this.render()
      } else {
        app.nextSong()
        audio.play()
      }
    }

    // Xử lý click lặp lại 1 bài hát
    prevBtn.onclick = () => {
      if (app.isRandom) {
        app.playRandomSong()
        audio.play()
      } else {
        app.prevSong()
        audio.play()
      }
    }

    // Xử lý khi hết song thì qua bài mới
    audio.onended = () => {
      if (app.isRepeat) { // khi đc bật repeat thì phát lại bài hát
        audio.play()
      } else {
        nextBtn.click()
        // phương thức click sẽ được tự động click thay vì onclick

      }
    }

    // xử lý khi click repeat bài hát hiện tại
    repeatBtn.onclick = () => {

      app.isRepeat = !app.isRepeat // đảo true thành false , false thành true
      repeatBtn.classList.toggle('active', app.isRepeat)

      // cách 2 : if else
      // if (app.isRepeat) {
      //   repeatBtn.classList.remove('active')  
      //   app.isRepeat = false
      // } else { 
      //   repeatBtn.classList.add('active')
      //   app.isRepeat = true
      // }
    }

    randomBtn.onclick = () => {
      app.isRandom = !app.isRandom
      randomBtn.classList.toggle('active', app.isRandom)
      // cách viết khác của nút bật tắt nút random
    }

    // xử lý khi click vào danh sách bài hát
    playList.onclick = (e) => {
      // khi next xong thì hiện icon đang chơi nhạc
      this.isPlaying = false 
      playBtn.click()
 
      const songNode = e.target.closest('.song:not(.active)')
      if (songNode || e.target.closest('.option')) {
        if (songNode) {
          this.currentIndex = Number(songNode.getAttribute('index'))
          this.loadCurrentSong()
          this.render()
          audio.play()
        }

        // khi chọn vào option
        if (e.target.closest('.option')) {

        }
      }
    }
  },

  scrollToActiveSong: function () {
    setTimeout(() => {
      $('.song.active').scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      })
    }, 200)
  },

  // load bài hát hiện tại
  loadCurrentSong: function () {
    heading.textContent = this.currentSong.name
    cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
    audio.src = this.currentSong.path
  },

  // khi hát trước đó
  prevSong: function () {
    this.currentIndex--
    if (this.currentIndex > 0) {
      this.currentSong = 0;
    }
    this.loadCurrentSong()
    // render lại để check Đk để active bài hát hiện tại
    this.render()
  },

  // bài hát tiếp theo
  nextSong: function () {
    this.currentIndex++
    if (this.currentIndex > this.songs.length) {
      this.currentSong = 0
    }
    this.loadCurrentSong()
    this.scrollToActiveSong()
    // render lại để check Đk để active bài hát hiện tại
    this.render()
  },

  playRandomSong: function () {
    do {
      newIndex = Math.floor(Math.random() * this.songs.length)
    } while (newIndex === this.currentIndex)
    this.currentIndex = newIndex
    this.loadCurrentSong()
  },

  render: function () {
    const htmls = this.songs.map((song, index) => {
      return `
      <div class ="song ${index === this.currentIndex ? 'active' : ''}" index = "${index}">
          <div class="thumb"
              style="background-image: url('${song.image}')">
          </div>
          <div class="body">
              <h3 class="title">${song.name}</h3>
              <p class="author">${song.singer}</p>
          </div>
          <div class="option">
              <i class="fas fa-ellipsis-h"></i>
          </div>
      </div>
     `
    })
    playList.innerHTML = htmls.join('')
  },

  start: function () {
    // định nghĩa các thuộc tính object
    this.defineProperties()

    // load bài hát đầu tiên
    this.loadCurrentSong()

    //Xử lý các sự kiện (Dom event)
    this.handleEvents()

    // render bài hát
    this.render()
  }
};

app.start();


