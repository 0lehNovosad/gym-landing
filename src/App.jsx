import { useState, useEffect, useRef } from 'react'
import {
  Dumbbell,
  Users,
  Clock,
  Trophy,
  Flame,
  Heart,
  Star,
  Check,
  ChevronDown,
  Menu,
  X,
  Github,
  Twitter,
  Linkedin,
  Instagram,
  Zap,
  Target,
  Calendar,
} from 'lucide-react'

// ——— Animated counter hook ———
function useCountUp(end, duration, isVisible) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!isVisible) return
    let start = 0
    const startTime = Date.now()
    const step = () => {
      const now = Date.now()
      const progress = Math.min((now - startTime) / duration, 1)
      setCount(Math.floor(progress * end))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [end, duration, isVisible])
  return count
}

// ——— useIntersectionObserver ———
function useInView(threshold = 0.1) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, inView]
}

const FEATURES = [
  { icon: Dumbbell, title: 'Професійне обладнання', desc: 'Тренажери провідних брендів та вільні ваги' },
  { icon: Flame, title: 'Групові заняття', desc: 'Йога, функціонал, HIIT та персональні тренування' },
  { icon: Clock, title: '24/7 доступ', desc: 'Тренуйся будь-коли — зал відкритий цілодобово' },
  { icon: Trophy, title: 'Тренерський супровід', desc: 'Сертифіковані тренери та персональні плани' },
  { icon: Heart, title: 'Зона відпочинку', desc: 'Сауна, душ та зона релаксу після тренування' },
  { icon: Users, title: 'Комʼюніті', desc: 'Змагання, челенджі та підтримка однодумців' },
]

const STATS = [
  { value: 15, suffix: 'K+', label: 'Клієнтів' },
  { value: 98, suffix: '%', label: 'Доволених' },
  { value: 24, suffix: '/7', label: 'Годин роботи' },
  { value: 50, suffix: '+', label: 'Тренерів' },
]

const STEPS = [
  { icon: Calendar, title: 'Обери абонемент', desc: 'Підбери тариф під свої цілі та графік' },
  { icon: Target, title: 'Пройди орієнтацію', desc: 'Знайомство з залом та перша консультація' },
  { icon: Zap, title: 'Досягай результатів', desc: 'Тренуйся за планом та відстежуй прогрес' },
]

const TESTIMONIALS = [
  { name: 'Олександр Коваль', role: 'Бізнесмен', text: 'За пів року змінив тіло та звички. Атмосфера та тренерський склад — топ.', initials: 'ОК', color: 'from-orange-500 to-red-600' },
  { name: 'Марія Шевченко', role: 'Фітнес-ентузіаст', text: 'Групові заняття дають нереальний заряд. Рекомендую всім, хто хоче рухатись.', initials: 'МШ', color: 'from-amber-500 to-orange-600' },
  { name: 'Дмитро Петренко', role: 'Стартапер', text: '24/7 — це те, що треба при ненормованому графіку. Якість обладнання на висоті.', initials: 'ДП', color: 'from-red-500 to-rose-600' },
]

const PRICING = [
  { name: 'Базовий', price: 599, features: ['Доступ до залу', 'Душ та шафки', 'Безліміт відвідувань'], popular: false },
  { name: 'Про', price: 999, features: ['Все з Базового', 'Групові заняття', 'Персональна консультація', 'Зона відпочинку'], popular: true },
  { name: 'Ентерпрайз', price: 1999, features: ['Все з Про', 'Персональні тренування', 'План харчування', 'Сауна безліміт'], popular: false },
]

const FAQ_ITEMS = [
  { q: 'Чи потрібна попередня підготовка?', a: 'Ні. Ми підбираємо навантаження під будь-який рівень. Для новачків є орієнтаційна екскурсія та консультація.' },
  { q: 'Як скасувати або заморозити абонемент?', a: 'Заморозку до 14 днів на рік можна оформити в особистому кабінеті або у адміністратора. Скасування — за 5 днів до кінця періоду.' },
  { q: 'Чи є паркування?', a: 'Так. Для клієнтів залу безкоштовне паркування на території комплексу.' },
  { q: 'Що взяти з собою на перше тренування?', a: 'Зручний одяг, взуття для залу, рушник та вода. Все інше можна придбати на рецепції.' },
  { q: 'Чи проводяться групові заняття за розкладом?', a: 'Так. Розклад групових програм є на сайті та в додатку. Запис через особистий кабінет.' },
  { q: 'Чи можна прийти з другом на пробне?', a: 'Так. Діє акція «Приведи друга» — один безкоштовний візит для нового гостя за рекомендацією члена клубу.' },
]

const FOOTER_LINKS = {
  'Зал': ['Абонементи', 'Групові заняття', 'Тренери', 'Обладнання'],
  'Клієнтам': ['FAQ', 'Правила', 'Контакты', 'Вакансії'],
  'Медіа': ['Блог', 'Instagram', 'Подкасти', 'Відгуки'],
  'Компанія': ['Про нас', 'Партнери', 'Преса', 'Кар’єра'],
}

export default function App() {
  const [navScrolled, setNavScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [billingYearly, setBillingYearly] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)
  const [email, setEmail] = useState('')

  const heroRef = useRef(null)
  const [statsRef, statsInView] = useInView(0.3)
  const [featRef, featInView] = useInView(0.08)
  const [stepsRef, stepsInView] = useInView(0.15)
  const [testRef, testInView] = useInView(0.1)
  const [pricingRef, pricingInView] = useInView(0.1)
  const [faqRef, faqInView] = useInView(0.08)
  const [ctaRef, ctaInView] = useInView(0.2)

  const count1 = useCountUp(15, 2000, statsInView)
  const count2 = useCountUp(98, 2000, statsInView)
  const count3 = useCountUp(24, 2000, statsInView)
  const count4 = useCountUp(50, 2000, statsInView)

  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMobileOpen(false)
  }

  return (
    <>
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -20px) scale(1.05); }
          66% { transform: translate(-20px, 20px) scale(0.95); }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.4; filter: blur(60px); }
          50% { opacity: 0.7; filter: blur(80px); }
        }
        @keyframes grid-pulse {
          0%, 100% { opacity: 0.03; }
          50% { opacity: 0.08; }
        }
        .animate-fade-in-up { animation: fadeInUp 0.8s ease-out forwards; }
        .animate-float { animation: float 12s ease-in-out infinite; }
        .animate-pulse-glow { animation: pulse-glow 8s ease-in-out infinite; }
        .animate-grid-pulse { animation: grid-pulse 4s ease-in-out infinite; }
        .delay-1 { animation-delay: 0.1s; }
        .delay-2 { animation-delay: 0.2s; }
        .delay-3 { animation-delay: 0.3s; }
        .delay-4 { animation-delay: 0.4s; }
        .delay-5 { animation-delay: 0.5s; }
        .section-inview { opacity: 0; transform: translateY(40px); transition: opacity 0.7s ease, transform 0.7s ease; }
        .section-inview.visible { opacity: 1; transform: translateY(0); }
        .stagger-1 { transition-delay: 0.1s; }
        .stagger-2 { transition-delay: 0.2s; }
        .stagger-3 { transition-delay: 0.3s; }
        .stagger-4 { transition-delay: 0.4s; }
        .stagger-5 { transition-delay: 0.5s; }
        .stagger-6 { transition-delay: 0.6s; }
        .accordion-content { max-height: 0; overflow: hidden; transition: max-height 0.4s ease; }
        .accordion-content.open { max-height: 500px; }
        .accordion-chevron { transition: transform 0.3s ease; }
        .accordion-chevron.rotated { transform: rotate(180deg); }
      `}</style>

      {/* ——— NAVBAR ——— */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          navScrolled ? 'bg-[#08080f]/80 backdrop-blur-xl border-b border-white/10' : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16 md:h-20">
          <a href="#" onClick={(e) => { e.preventDefault(); scrollTo('hero'); }} className="flex items-center gap-2 text-white font-bold text-lg">
            <Dumbbell className="w-7 h-7 text-orange-500" />
            <span>POWER GYM</span>
          </a>
          <nav className="hidden md:flex items-center gap-8">
            {['Переваги', 'Як це працює', 'Відгуки', 'Ціни', 'FAQ'].map((label, i) => (
              <button key={i} onClick={() => scrollTo(label === 'Переваги' ? 'features' : label === 'Як це працює' ? 'how' : label === 'Відгуки' ? 'testimonials' : label === 'Ціни' ? 'pricing' : 'faq')} className="text-white/80 hover:text-white text-sm font-medium transition">
                {label}
              </button>
            ))}
          </nav>
          <div className="hidden md:block">
            <button onClick={() => scrollTo('pricing')} className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold text-sm hover:scale-105 hover:shadow-lg hover:shadow-orange-500/30 transition-all">
              Обрати план
            </button>
          </div>
          <button className="md:hidden p-2 text-white" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Меню">
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        {mobileOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-[#08080f]/95 backdrop-blur-xl border-b border-white/10 py-4 px-4 flex flex-col gap-2">
            {['Переваги', 'Як це працює', 'Відгуки', 'Ціни', 'FAQ'].map((label, i) => (
              <button key={i} onClick={() => scrollTo(label === 'Переваги' ? 'features' : label === 'Як це працює' ? 'how' : label === 'Відгуки' ? 'testimonials' : label === 'Ціни' ? 'pricing' : 'faq')} className="text-left py-3 text-white/90 font-medium">
                {label}
              </button>
            ))}
            <button onClick={() => { scrollTo('pricing'); setMobileOpen(false); }} className="mt-2 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold">
              Обрати план
            </button>
          </div>
        )}
      </header>

      {/* ——— HERO ——— */}
      <section id="hero" ref={heroRef} className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
        <div className="absolute inset-0 bg-[#08080f]" />
        <div className="absolute inset-0 opacity-30 animate-grid-pulse" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-orange-500/20 blur-[100px] animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-red-500/20 blur-[80px] animate-float" style={{ animationDelay: '-4s' }} />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight opacity-0 animate-fade-in-up">
            <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-red-500 bg-clip-text text-transparent">Трансформуй тіло.</span>
            <br />
            <span className="text-white">Розпали дух.</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-white/70 max-w-2xl mx-auto opacity-0 animate-fade-in-up delay-2">
            Сучасний зал, тренерський супровід та комʼюніті, де кожен крок — до твоєї найкращої форми.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-fade-in-up delay-3">
            <a href="#pricing" className="inline-flex items-center justify-center min-h-[44px] px-8 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold text-base hover:scale-105 hover:shadow-xl hover:shadow-orange-500/40 transition-all">
              Почати безкоштовний тиждень
            </a>
            <a href="#how" className="inline-flex items-center justify-center min-h-[44px] px-8 py-3 rounded-xl border border-white/20 text-white font-medium hover:bg-white/10 transition">
              Як це працює
            </a>
          </div>
        </div>
      </section>

      {/* ——— FEATURES ——— */}
      <section id="features" ref={featRef} className={`section-inview py-24 ${featInView ? 'visible' : ''}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Чому обирають нас</h2>
            <p className="mt-3 text-white/60 max-w-xl mx-auto">Все необхідне для комфортних тренувань та швидкого прогресу</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f, i) => (
              <div
                key={i}
                className={`section-inview ${featInView ? 'visible' : ''} stagger-${i + 1} p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:scale-[1.03] hover:-translate-y-1 hover:border-orange-500/30 hover:shadow-lg hover:shadow-orange-500/10 transition-all duration-300 cursor-default`}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white">
                  <f.icon className="w-6 h-6" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-white">{f.title}</h3>
                <p className="mt-2 text-white/60 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ——— STATS ——— */}
      <div className="relative py-4">
        <div className="absolute inset-0 h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />
      </div>
      <section ref={statsRef} className={`section-inview py-20 ${statsInView ? 'visible' : ''}`}>
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[count1, count2, count3, count4].map((val, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                  {val}{STATS[i].suffix}
                </div>
                <div className="mt-1 text-white/60 text-sm font-medium">{STATS[i].label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ——— HOW IT WORKS ——— */}
      <section id="how" ref={stepsRef} className={`section-inview py-24 ${stepsInView ? 'visible' : ''}`}>
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Як це працює</h2>
            <p className="mt-3 text-white/60">Три кроки до першого тренування</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4">
            {STEPS.map((s, i) => (
              <div key={i} className="relative flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-orange-500/30">
                  {i + 1}
                </div>
                {i < STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-7 left-[calc(50%+28px)] w-[calc(100%-3.5rem)] h-px bg-gradient-to-r from-orange-500/50 to-transparent -z-10" />
                )}
                <div className="mt-6 w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto">
                  <s.icon className="w-6 h-6 text-orange-400" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-white">{s.title}</h3>
                <p className="mt-2 text-white/60 text-sm max-w-xs">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ——— TESTIMONIALS ——— */}
      <section id="testimonials" ref={testRef} className={`section-inview py-24 ${testInView ? 'visible' : ''}`}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Відгуки клієнтів</h2>
            <p className="mt-3 text-white/60">Що кажуть ті, хто вже тренується у нас</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 overflow-x-auto md:overflow-visible pb-4 md:pb-0">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="flex-shrink-0 md:flex-shrink p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm min-w-[280px]">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white font-bold text-sm`}>
                    {t.initials}
                  </div>
                  <div>
                    <div className="flex gap-0.5 text-amber-400">
                      {[1, 2, 3, 4, 5].map((j) => <Star key={j} className="w-4 h-4 fill-current" />)}
                    </div>
                    <p className="font-semibold text-white mt-0.5">{t.name}</p>
                    <p className="text-white/50 text-xs">{t.role}</p>
                  </div>
                </div>
                <p className="mt-4 text-white/80 text-sm leading-relaxed">&ldquo;{t.text}&rdquo;</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ——— PRICING ——— */}
      <section id="pricing" ref={pricingRef} className={`section-inview py-24 ${pricingInView ? 'visible' : ''}`}>
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Оберіть тариф</h2>
            <p className="mt-3 text-white/60">Без прихованих платежів. Скасуй будь-коли.</p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <span className={`text-sm font-medium ${!billingYearly ? 'text-white' : 'text-white/50'}`}>Щомісячно</span>
              <button
                role="switch"
                aria-checked={billingYearly}
                onClick={() => setBillingYearly(!billingYearly)}
                className={`relative w-12 h-6 rounded-full transition-colors ${billingYearly ? 'bg-gradient-to-r from-orange-500 to-red-600' : 'bg-white/20'}`}
              >
                <span className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow transition-transform ${billingYearly ? 'left-7' : 'left-1'}`} />
              </button>
              <span className={`text-sm font-medium ${billingYearly ? 'text-white' : 'text-white/50'}`}>Щорічно <span className="text-green-400 text-xs">−20%</span></span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRICING.map((plan, i) => {
              const price = billingYearly ? Math.round(plan.price * 12 * 0.8) : plan.price
              const period = billingYearly ? '/рік' : '/міс'
              return (
                <div
                  key={i}
                  className={`relative p-6 rounded-2xl border transition-all duration-300 ${
                    plan.popular
                      ? 'border-orange-500/50 bg-white/10 scale-105 shadow-xl shadow-orange-500/20 hover:scale-[1.07] hover:shadow-2xl hover:shadow-orange-500/25'
                      : 'border-white/10 bg-white/5 hover:scale-[1.02] hover:border-white/20'
                  }`}
                >
                  {plan.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gradient-to-r from-orange-500 to-red-600 text-white text-xs font-semibold">
                      Популярний
                    </span>
                  )}
                  <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold text-white">{price}</span>
                    <span className="text-white/60">грн{period}</span>
                  </div>
                  <ul className="mt-6 space-y-3">
                    {plan.features.map((feat, j) => (
                      <li key={j} className="flex items-center gap-2 text-white/80 text-sm">
                        <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                        {feat}
                      </li>
                    ))}
                  </ul>
                  <button className={`mt-6 w-full py-3 rounded-xl font-semibold transition-all hover:scale-[1.02] ${
                    plan.popular ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white hover:shadow-lg hover:shadow-orange-500/30' : 'bg-white/10 text-white hover:bg-white/20'
                  }`}>
                    Обрати
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ——— FAQ ——— */}
      <section id="faq" ref={faqRef} className={`section-inview py-24 ${faqInView ? 'visible' : ''}`}>
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Часті питання</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {FAQ_ITEMS.map((item, i) => (
              <div key={i} className="rounded-xl border border-white/10 bg-white/5 overflow-hidden">
                <button
                  className="w-full flex items-center justify-between p-4 text-left text-white font-medium hover:bg-white/5 transition"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  {item.q}
                  <ChevronDown className={`w-5 h-5 text-white/60 accordion-chevron flex-shrink-0 ml-2 ${openFaq === i ? 'rotated' : ''}`} />
                </button>
                <div className={`accordion-content ${openFaq === i ? 'open' : ''}`}>
                  <p className="px-4 pb-4 text-white/70 text-sm">{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ——— CTA BANNER ——— */}
      <section ref={ctaRef} className={`section-inview py-24 ${ctaInView ? 'visible' : ''}`}>
        <div className="max-w-4xl mx-auto px-4">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-orange-600 via-orange-500 to-red-600 p-10 sm:p-14">
            <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)' }} />
            <div className="relative z-10 text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">Готовий змінити себе?</h2>
              <p className="mt-3 text-white/90 text-lg">Отримай тиждень безкоштовного доступу — без картки, без зобовʼязань.</p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Твій email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 min-h-[44px] px-4 rounded-xl bg-white/20 border border-white/30 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <button className="min-h-[44px] px-6 py-3 rounded-xl bg-white text-orange-600 font-semibold hover:scale-105 hover:shadow-lg transition-all">
                  Отримати доступ
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ——— FOOTER ——— */}
      <footer className="border-t border-white/10 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
            <div className="lg:col-span-1">
              <a href="#" className="flex items-center gap-2 text-white font-bold text-lg">
                <Dumbbell className="w-6 h-6 text-orange-500" />
                POWER GYM
              </a>
              <p className="mt-3 text-white/60 text-sm">Зал для тих, хто хоче більше. Тренуйся разом з нами.</p>
              <div className="mt-4 flex gap-3">
                <a href="#" className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-white/80 hover:bg-orange-500 hover:text-white transition" aria-label="Github"><Github className="w-5 h-5" /></a>
                <a href="#" className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-white/80 hover:bg-orange-500 hover:text-white transition" aria-label="Twitter"><Twitter className="w-5 h-5" /></a>
                <a href="#" className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-white/80 hover:bg-orange-500 hover:text-white transition" aria-label="LinkedIn"><Linkedin className="w-5 h-5" /></a>
                <a href="#" className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-white/80 hover:bg-orange-500 hover:text-white transition" aria-label="Instagram"><Instagram className="w-5 h-5" /></a>
              </div>
            </div>
            {Object.entries(FOOTER_LINKS).map(([title, links]) => (
              <div key={title}>
                <h4 className="font-semibold text-white text-sm uppercase tracking-wider">{title}</h4>
                <ul className="mt-4 space-y-2">
                  {links.map((link, j) => (
                    <li key={j}>
                      <a href="#" className="text-white/60 hover:text-white text-sm transition">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-12 pt-8 border-t border-white/10 text-center text-white/50 text-sm">
            © {new Date().getFullYear()} POWER GYM. Усі права захищені.
          </div>
        </div>
      </footer>
    </>
  )
}
