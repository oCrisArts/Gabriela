import { useEffect, useState } from "react"

const A = "/assets"
const whatsappUrl =
  "https://wa.me/5551998899330?text=Olá%2C%20Gabriela!%20Gostaria%20de%20agendar%20um%20atendimento."

const navItems = [
  { id: "servicos", label: "Serviços" },
  { id: "equipe", label: "Equipe técnica" },
  { id: "formacao", label: "Formação" },
  { id: "agendamento", label: "Como agendar" },
]

const services = [
  {
    title: "Consulta veterinária",
    description: "Avaliação clínica de animais silvestres e não convencionais",
    image: "service-clinic.png",
  },
  {
    title: "Coleta de exames",
    description: "Coleta de amostras para investigação clínica",
    image: "service-exams.png",
  },
  {
    title: "Microchipagem",
    description: "Identificação eletrônica do animal",
    image: "service-microchip.png",
  },
  {
    title: "Documentação para viagens",
    description: "Orientação para deslocamentos com animais",
    image: "service-travel.png",
  },
  {
    title: "Equipe cirúrgica e anestésica",
    description: "Profissionais reunidos conforme o animal e o procedimento",
    image: "service-surgical.png",
  },
]

const credentials = [
  {
    type: "GRADUAÇÃO",
    title: (
      <>
        Medicina
        <br />
        Veterinária
      </>
    ),
    description:
      "Graduada pelo Centro Universitário Ritter dos Reis (UniRitter), em 2019.",
    foot: "UNIRITTER · 2014–2019",
    image: "b9d03.png",
    mark: "star",
  },
  {
    type: "EXTENSÃO E MONITORIA",
    title: (
      <>
        Clínica e<br />
        conservação
      </>
    ),
    description:
      "Foi monitora em Clínica e Conservação de Animais Silvestres e bolsista do projeto Amigo do Bicho, voltado à interação entre comunidade e fauna.",
    foot: "UNIRITTER · 2016–2017",
    image: "30596.png",
    mark: "waves",
  },
  {
    type: "ESTÁGIO CURRICULAR",
    title: (
      <>
        Zoo
        <br />
        Pomerode
      </>
    ),
    description:
      "Teve experiência em clínica médica e cirúrgica de animais selvagens no Zoo Pomerode, em abril de 2019.",
    foot: "ZOO POMERODE · 2019",
    image: "6cedb.png",
    mark: "waves",
  },
  {
    type: "PESQUISA",
    title: (
      <>
        Conservação
        <br />
        de fauna
      </>
    ),
    description:
      "Apresentou, no congresso da AZAB, um estudo sobre marcadores fecais para identificar leões-angolanos sob cuidados humanos, em 2019.",
    foot: "CONGRESSO DA AZAB · 2019",
    image: "88b12.png",
    mark: "north_east",
  },
  {
    type: "PÓS-GRADUAÇÃO",
    title: (
      <>
        Clínica e cirurgia
        <br />
        de silvestres
      </>
    ),
    description:
      "Pós-graduação em Clínica Médica e Cirurgia de Animais Selvagens pela Anclivepa/SP, iniciada em 2023.",
    foot: "ANCLIVEPA/SP · INÍCIO EM 2023",
    image: "b9d03.png",
    mark: "star",
  },
]

function Arrow() {
  return (
    <span aria-hidden="true" className="material-symbols-outlined arrow">
      arrow_forward
    </span>
  )
}

function Eyebrow({
  children,
  light = false,
}: {
  children: React.ReactNode
  light?: boolean
}) {
  return <p className={`eyebrow${light ? " eyebrow-light" : ""}`}>{children}</p>
}

function App() {
  const [activeSection, setActiveSection] = useState("inicio")
  const [menuOpen, setMenuOpen] = useState(false)
  const [introFinished, setIntroFinished] = useState(false)

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches

    if (reduceMotion) {
      setIntroFinished(true)
      return
    }

    document.body.classList.add("intro-locked")
    return () => document.body.classList.remove("intro-locked")
  }, [])

  useEffect(() => {
    if (introFinished) document.body.classList.remove("intro-locked")
  }, [introFinished])

  useEffect(() => {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("section-in-view", entry.isIntersecting)
        })
      },
      {
        rootMargin: "-10% 0px -10% 0px",
        threshold: 0.12,
      },
    )
    document
      .querySelectorAll("main > section")
      .forEach((section) => sectionObserver.observe(section))

    const spyObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActiveSection(visible.target.id)
      },
      { rootMargin: "-25% 0px -55% 0px", threshold: [0, 0.2, 0.5] },
    )
    document
      .querySelectorAll("main > section[id]")
      .forEach((section) => spyObserver.observe(section))

    return () => {
      sectionObserver.disconnect()
      spyObserver.disconnect()
    }
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    setMenuOpen(false)
  }

  return (
    <div
      className={`site-shell ${introFinished ? "site-ready" : "intro-playing"}`}
    >
      <header className="site-header">
        <button
          className="brand"
          onClick={() => scrollTo("inicio")}
          aria-label="Gabriela, início"
        >
          <img src={`${A}/93569.png`} alt="Gabriela Mendicelli" />
        </button>
        <button
          className="menu-toggle"
          aria-label="Abrir menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </button>
        <nav
          className={`main-nav${menuOpen ? " menu-open" : ""}`}
          aria-label="Navegação principal"
        >
          {navItems.map((item) => (
            <button
              key={item.id}
              className={activeSection === item.id ? "active" : ""}
              onClick={() => scrollTo(item.id)}
            >
              {item.label}
            </button>
          ))}
          <button className="nav-cta" onClick={() => scrollTo("contato")}>
            Agendar <Arrow />
          </button>
        </nav>
      </header>

      <main>
        <section className="hero photo-section" id="inicio">
          <video
            className="section-photo hero-video"
            src={`${A}/macaw.mp4`}
            poster={`${A}/3856a.png`}
            autoPlay
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
            onEnded={() => setIntroFinished(true)}
            onError={() => setIntroFinished(true)}
          />
          <div className="photo-shade hero-shade" />
          <div className="hero-copy reveal" data-reveal>
            <Eyebrow>
              MÉDICA-VETERINÁRIA · ANIMAIS SILVESTRES E NÃO CONVENCIONAIS
            </Eyebrow>
            <h1>
              Gabriela<span>.</span>
            </h1>
            <p>
              Atendimento veterinário para animais silvestres e não
              convencionais, em todo o Brasil, com agendamento.
            </p>
          </div>
        </section>

        <section className="services photo-section" id="servicos">
          <img
            className="section-photo parallax-photo"
            src={`${A}/72089.png`}
            alt=""
          />
          <div className="photo-shade services-shade" />
          <div className="section-grid">
            <div className="section-intro reveal" data-reveal>
              <Eyebrow>SERVIÇOS VETERINÁRIOS</Eyebrow>
              <h2>
                Consultas e<br />
                <span>outros serviços.</span>
              </h2>
              <p>
                Além das consultas, Gabriela realiza coleta de exames,
                microchipagem e orientação para viagens. Alguns procedimentos
                exigem profissionais de outras especialidades. Nesses casos, ela
                reúne e coordena a equipe adequada ao animal e ao procedimento.
              </p>
            </div>
            <div className="service-list reveal reveal-delay" data-reveal>
              {services.map((service) => (
                <article className="service-card" key={service.title}>
                  <img src={`${A}/${service.image}`} alt="" />
                  <div>
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                  </div>
                  <Arrow />
                </article>
              ))}
            </div>
          </div>
          <span className="scene-label">SERVIÇOS</span>
        </section>

        <section className="team photo-section" id="equipe">
          <img
            className="section-photo parallax-photo"
            src={`${A}/274b2.png`}
            alt=""
          />
          <div className="photo-shade team-shade" />
          <div className="team-content reveal" data-reveal>
            <Eyebrow>PROCEDIMENTOS ESPECIALIZADOS</Eyebrow>
            <h2>
              Como
              <br />
              Gabriela
              <br />
              <span>
                organiza a<br />
                equipe.
              </span>
            </h2>
            <div className="team-story">
              <p>
                Alguns animais, doenças e procedimentos exigem conhecimentos de
                diferentes especialidades.
              </p>
              <p>
                Gabriela avalia o caso, identifica os profissionais necessários
                e reúne a equipe para aquele animal e aquele procedimento.
              </p>
              <p>
                Ela coordena as etapas do procedimento com a equipe cirúrgica e
                anestésica, quando essas especialidades são necessárias.
              </p>
            </div>
            <a
              className="orange-button"
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
            >
              Conversar sobre um caso <Arrow />
            </a>
          </div>
        </section>

        <section className="journey" id="formacao">
          <div className="journey-layout">
            <div className="journey-intro reveal" data-reveal>
              <Eyebrow light>FORMAÇÃO E EXPERIÊNCIA PROFISSIONAL</Eyebrow>
              <div className="journey-title">
                <h2>
                  Formação e<br />
                  experiência<span>.</span>
                </h2>
                <figure>
                  <img
                    src={`${A}/410bb.png`}
                    alt="Retrato de Gabriela Mendicelli, médica veterinária"
                  />
                  <figcaption>
                    <span>GABRIELA</span>
                    <span>VETERINÁRIA</span>
                  </figcaption>
                </figure>
              </div>
              <p className="journey-lead">
                Graduação, estágios, pesquisa e pós-graduação em animais
                selvagens.
              </p>
              <p className="journey-note">
                Atuação em clínica e cirurgia de animais selvagens.
              </p>
            </div>
            <div className="credential-track reveal reveal-delay" data-reveal>
              {credentials.map((card) => (
                <article className="credential-card" key={card.type}>
                  <img src={`${A}/${card.image}`} alt="" />
                  <div className="card-wash" />
                  <span className="card-type">{card.type}</span>
                  <span
                    aria-hidden="true"
                    className="material-symbols-outlined card-mark"
                  >
                    {card.mark}
                  </span>
                  <div className="card-copy">
                    <h3>{card.title}</h3>
                    <p>{card.description}</p>
                    <span>{card.foot}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="booking-flow" id="agendamento">
          <div className="flow-copy reveal" data-reveal>
            <Eyebrow>AGENDAMENTO PELO WHATSAPP</Eyebrow>
            <h2>
              Como
              <br />
              agendar
              <br />
              uma consulta
            </h2>
            <p>
              Informe o estado, a cidade, uma data de preferência e qual animal
              precisa de atendimento. O site prepara uma mensagem para o
              WhatsApp. Gabriela confirma a disponibilidade e combina com você
              se o atendimento será presencial ou online. O atendimento pode ser
              agendado em qualquer estado do Brasil.
            </p>
            <small>
              O endereço é opcional. O mapa mostra apenas o centro aproximado da
              cidade, nunca o endereço informado.
            </small>
            <div className="flow-label">
              <span>PREPARAR UMA CONVERSA</span>
              <span>COMEÇAR</span>
            </div>
            <a href={whatsappUrl} target="_blank" rel="noreferrer">
              Prefere falar direto? WhatsApp <Arrow />
            </a>
          </div>
          <div className="map reveal reveal-delay" data-reveal>
            <img
              src={`${A}/5ea43.png`}
              alt="Mapa do Brasil e da América do Sul"
            />
            <div className="map-vignette" />
            <div className="map-readout">
              <i /> Brasil · escolha seu estado
            </div>
            <span className="map-credit">
              MapLibre · OpenFreeMap · dados OpenStreetMap
            </span>
          </div>
        </section>

        <section className="contact" id="contato">
          <div className="contact-copy reveal" data-reveal>
            <Eyebrow light>CONTATO E AGENDAMENTO</Eyebrow>
            <h2>
              Agende pelo
              <br />
              WhatsApp
            </h2>
            <p>
              Gabriela atende animais silvestres e não convencionais em qualquer
              estado do Brasil. O atendimento precisa ser agendado. A data, o
              local e o formato, presencial ou online, são combinados pelo
              WhatsApp.
            </p>
            <dl>
              <div>
                <dt>WHATSAPP</dt>
                <dd>+55 (51) 99889-9330</dd>
              </div>
              <div>
                <dt>INSTAGRAM</dt>
                <dd>@rotina.devet</dd>
              </div>
              <div>
                <dt>ATENDIMENTO</dt>
                <dd>Brasil · agendamento prévio</dd>
              </div>
            </dl>
          </div>
          <div className="booking-panel reveal reveal-delay" data-reveal>
            <div className="panel-top">
              <span>AGENDAMENTO</span>
              <span>
                <i /> WHATSAPP
              </span>
            </div>
            <div className="panel-body">
              <Arrow />
              <h3>Marcar um atendimento</h3>
              <p>
                Converse com Gabriela para explicar o caso, consultar datas e
                combinar se o atendimento será presencial ou online.
              </p>
              <a
                className="orange-button"
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
              >
                Chamar no WhatsApp <Arrow />
              </a>
            </div>
            <small>
              Agendamento combinado diretamente com a Gabriela pelo WhatsApp.
            </small>
          </div>
          <footer>
            <button
              onClick={() => scrollTo("inicio")}
              aria-label="Gabriela Mendicelli, início"
            >
              <img src={`${A}/93569.png`} alt="Gabriela Mendicelli" />
            </button>
            <span>
              MEDICINA VETERINÁRIA · ANIMAIS SILVESTRES E NÃO CONVENCIONAIS
            </span>
            <button onClick={() => scrollTo("inicio")}>
              Voltar ao início ↑
            </button>
          </footer>
        </section>
      </main>
    </div>
  )
}

export default App
