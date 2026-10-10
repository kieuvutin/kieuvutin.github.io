# Bé Học Toán – bản đồ mã nguồn
Sửa file nhỏ trong `css/` và `js/`, rồi chạy `python3 src/build.py` để ghép ra `index.html` và `be-hoc-toan.html`.
Thứ tự ghép JS (giữ nguyên vì các `var` đầu file chạy theo thứ tự): bank → bank-types → bank-gen → data → art → app → game → adventure → care-art → scenes → care → sfx → world → weather → life → life2 → fit → quiz → parent → main.
CSS: base → layout → anim → world → life → life2 → fit.
Lưu ý đặt tên: `G` là bộ đề (bank.js); đừng đặt biến/hàm toàn cục trùng tên có sẵn của trình duyệt như `top`, `name`, `status`.
Thử nhanh trên trình duyệt: thêm `?hour=22&weather=rain&life=1&bgm=1` vào địa chỉ (giờ, thời tiết, bật hành vi tự động, bật nhạc nền).
Kiểm thử: `bash src/tests/run.sh` (cần Playwright).

## js/bank.js (4 KB)
Bộ đề: các hàm sinh câu cơ bản + bảng G[lớp][mức]

`N`, `R`, `pick`, `f`, `ab`, `add`, `sub`, `miss`, `missS`, `add3`, `mul`, `mulM`, `div`, `mix`, `mix2`, `wAdd`, `wSub`, `wMul`, `wDiv`, `wPct`, `dadd`, `dsub`, `dmul`, `ddiv`, `pct`, `G`

## js/bank-types.js (11 KB)
Bộ đề mở rộng: so sánh, đồng hồ, tiền, hình học, phân số… (đẩy vào G)

`sh`, `uq`, `o4`, `cmp`, `cmpE`, `big`, `nxt`, `seq`, `par`, `rnd`, `UN`, `unit`, `tstr`, `clock`, `clk`, `DN`, `notes`, `monN`, `monC`, `monM`, `SC`, `poly`, `shpSvg`, `SX`, `shape`, `sides`, `per`, `frac`

## js/bank-gen.js (0 KB)
mkO(), lvPick(), gen()

`mkO`, `lvOf`, `lvPick`, `fk`, `gen`

## js/data.js (2 KB)
Hằng số: điểm mốc T, tên nhân vật CH, icon IC, ic(), stars(), btn(), hydrate()

`T`, `CH`, `KEYS`, `isP`, `sn`, `IC`, `ic`, `stars`, `btn`, `hydrate`

## js/art.js (11 KB)
Hình vẽ SVG cây/con vật: art(k,stage)

`SH`, `SK`, `SP`, `CR`, `GR`, `stem`, `lf`, `flTop`, `tree`, `tree0`, `cac`, `plant`, `AN`, `WG`, `ext`, `EY`, `animal`, `art`

## js/app.js (15 KB)
Trạng thái DB, show(), màn hình, nhập-xuất-gộp dữ liệu, render(), idle(), anim()

`DB`, `save`, `$`, `owned`, `show`, `stg`, `idle`, `anim`, `burst`, `tile`, `drawGrid`, `drawHome`, `createKid`, `choose`, `play`, `finish`, `drawDone`, `openGal`, `gBack`, `drawGal`, `hFrom`, `p2`, `fT`, `fD`, `fS`, `dk`, `rel`, `ago`, `openHist`, `drawHist`, `esc`, `num`, `clean`, `lastT`, `mergeKid`, `dmsg`, `importText`, `impFile`, `dump`, `expFile`

## js/game.js (2 KB)
Độ khó (skill, adj), bong bóng thoại bub(), popAsk(), bảng cửu chương tq()

`rk`, `skill`, `adj`, `mset`, `anchorY`, `BUB`, `popAsk`, `tbStat`, `tq`

## js/adventure.js (10 KB)
Bản đồ phiêu lưu sau khi nuôi xong, hình sâu bọ bugArt()

`WN`, `OB`, `NEED`, `advLv`, `bossArt`, `bossUpd`, `deco`, `inner`, `wi`, `advMapOpen`, `grown`, `drawAdv`, `advStart`, `advDone`, `eye`, `bugArt`

## js/care-art.js (8 KB)
Chăm sóc: hằng số nhu cầu, hình đạo cụ (bình tưới, bao phân…), sparks/hearts/bubbles, pour(), food()

`NEEDS`, `NM`, `SCN`, `R2`, `careOn`, `ckind`, `needCls`, `acx`, `topY`, `CAN`, `needIcon`, `mud`, `sparks`, `hearts`, `bubbles`, `pour`, `food`

## js/scenes.js (5 KB)
Chăm sóc: SCN.* các hoạt cảnh (tưới, bón phân, xịt sâu, tắm, ăn, uống, thay nước, sục khí, sưởi ấm)

``

## js/care.js (1 KB)
Chăm sóc: needDraw() (nhu cầu từng câu), careDo() (chạy hoạt cảnh)

`needDraw`, `SCID`, `careDo`

## js/sfx.js (5 KB)
Âm thanh tổng hợp WebAudio: tone/noise, SFX (hoạt cảnh), CRY (tiếng kêu), nhạc nền

`AC`, `ac`, `tone`, `nbuf`, `noise`, `rpt`, `bub1`, `tweet`, `snd`, `SFX`, `scSnd`, `CRY`, `cry`, `bgmOn`, `bgmStart`, `bgmStep`

## js/world.js (3 KB)
Bầu trời theo giờ máy + thời tiết: nowH, tod, wx, skySvg, skyFit

`nowH`, `tod`, `wx`, `skySvg`, `skyFit`

## js/life.js (7 KB)
Đời sống bạn nhỏ giữa các câu: LV.* hành vi, lifeDo, lifeTick, poke (chạm nhân vật)

`LF`, `BFLY`, `ovAny`, `sleepy`, `sleepCls`, `lifeOK`, `mouthY`, `fd`, `zzg`, `LV`, `pickBeh`, `lifeDo`, `lifeTick`, `lifeStart`, `POKE`, `poke`

## js/quiz.js (7 KB)
Luồng câu hỏi: nextQ(), answer(), đọc to, cài đặt

`drawTbl`, `nextQ`, `todayN`, `answer`, `spk`, `readQ`, `DROP`, `drawSnd`, `toggle`, `drawSettings`

## js/parent.js (1 KB)
Mã PIN phụ huynh

`pin`, `hp`, `askPin`, `pinOpen`, `pinClose`, `pinDraw`, `pinKey`, `pinDone`, `setPin`, `pinOff`, `pinForgot`

## js/main.js (0 KB)
Khởi động

``

## js/weather.js (1 KB)
Thời tiết: mưa phía trước, vũng nước, ánh sáng mặt trời/trăng, cây nghiêng theo nắng (wxLayers, wxGround, leanCls)

`sunnyDay`, `leanCls`, `wxGround`, `wxLayers`

## js/life2.js (5 KB)
Hoạt động thêm cho nhân vật: đi dạo, nhảy, nhìn quanh, vươn vai, tắm nắng, rũ nước, bọ rùa, sâu đất, cá nhảy… và pickBeh()

`byC`, `ring`, `spray`, `foot`, `pickBeh`

## js/fit.js (1 KB) + css/fit.css
Khung nhân vật (trời + nhân vật + HUD tên/điểm) có kích thước CỐ ĐỊNH theo chiều cao máy (--ph, --fs); thẻ câu hỏi tự co chữ/nút qua data-f 0..6 (fitQ) để vừa khung, không đổi kích thước khung theo câu hỏi.

`petFit`, `fitQ`, `fitAll`
