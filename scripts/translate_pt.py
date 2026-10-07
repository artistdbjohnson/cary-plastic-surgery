#!/usr/bin/env python3
"""Build content/pt.json — European Portuguese twin of exact EN copy."""
import json, os, re, time, hashlib
from concurrent.futures import ThreadPoolExecutor, as_completed
import translators as ts

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PAGES = os.path.join(ROOT, "docs", "pages.json")
CACHE = os.path.join(ROOT, "content", "pt-cache.json")
OUT = os.path.join(ROOT, "content", "pt.json")
EXTRA = os.path.join(ROOT, "content", "ui-extra.json")

OVERRIDES = {
    "Book Now": "Marcar agora",
    "Book Your Consultation Today!": "Marque a sua consulta hoje!",
    "Sculpting Beauty with a Personal Touch.": "Esculpir a beleza com um toque pessoal.",
    "About": "Sobre",
    "Breast": "Mama",
    "Body": "Corpo",
    "Face": "Rosto",
    "Cosmetic": "Estética",
    "Gallery": "Galeria",
    "Contact": "Contacto",
    "Contact Us": "Contacte-nos",
    "Why Cary Plastic Surgery": "Porquê a Cary Plastic Surgery",
    "Meet Dr. Hanna": "Conheça o Dr. Hanna",
    "Patient Testimonials": "Testemunhos de pacientes",
    "Breast Augmentation": "Aumento mamário",
    "Breast Lift": "Lifting mamário",
    "Breast Reduction": "Redução mamária",
    "Breast Implant Removal": "Remoção de implantes mamários",
    "Gynecomastia": "Ginecomastia",
    "Tummy Tuck": "Abdominoplastia",
    "Liposuction": "Lipoaspiração",
    "Arm Lift": "Lifting de braços",
    "Thigh Lift": "Lifting de coxas",
    "Labial Reduction / Reconstruction": "Redução / reconstrução labial",
    "Facelift": "Lifting facial",
    "Blepharoplasty": "Blefaroplastia",
    "Brow Lift": "Lifting de sobrancelhas",
    "Otoplasty": "Otoplastia",
    "Rhinoplasty": "Rinoplastia",
    "Lip Filler": "Preenchimento labial",
    "Lip Fillers": "Preenchimento labial",
    "Injectables": "Injetáveis",
    "Microneedling": "Microagulhamento",
    "Scar Revisions": "Revisão de cicatrizes",
    "Before / After Gallery": "Galeria de antes / depois",
    "Before After Gallery": "Galeria de antes / depois",
    "Menu": "Menu",
    "Close": "Fechar",
    "Send": "Enviar",
    "Name": "Nome",
    "E-mail": "E-mail",
    "Phone": "Telefone",
    "Message": "Mensagem",
    "Personal Information": "Informação pessoal",
    "Appointment Information": "Informação da consulta",
    "Online Appointment Request": "Pedido de consulta online",
    "Preferred Contact Method": "Método de contacto preferido",
    "Preferred Date": "Data preferida",
    "Preferred Time": "Hora preferida",
    "I Am A": "Sou",
    "Inquiring About": "Assunto da consulta",
    "Insurance Type": "Tipo de seguro",
    "Referred By": "Referido por",
    "New Patient": "Paciente novo",
    "Existing Patient": "Paciente atual",
    "Whatever gets me in fastest": "O que me conseguir vaga mais depressa",
    "Morning": "Manhã",
    "Afternoon": "Tarde",
    "Contact me to arrange": "Contactem-me para combinar",
    "Self-pay / Out-of-pocket": "Pagamento próprio / sem seguro",
    "I'm not sure": "Não tenho a certeza",
    "Web search": "Pesquisa na web",
    "Social Media": "Redes sociais",
    "Family member": "Familiar",
    "Friend": "Amigo ou amiga",
    "Other": "Outro",
    "Call": "Telefonema",
    "Text": "Mensagem de texto",
    "(optional)": "(opcional)",
    "Or Call to Schedule an Appointment": "Ou telefone para marcar uma consulta",
    "View all reviews on Google": "Ver todas as avaliações no Google",
    "View on caryplasticsurgery.com": "Ver em caryplasticsurgery.com",
    "View Interactive Map": "Ver mapa interativo",
    "Location & Hours": "Localização e horário",
    "Our Hours": "O nosso horário",
    "Actual Patient": "Paciente real",
    "Google": "Google",
    "5 / 5 based upon 61 reviews.": "5 / 5 com base em 61 avaliações.",
    "What Our Patients Are Saying": "O que os nossos pacientes dizem",
    "built by dglxss · Independent design study — not affiliated with Cary Plastic Surgery or Dr. Donald P. Hanna.": "feito pela dglxss · Estudo de design independente — sem afiliação com a Cary Plastic Surgery nem com o Dr. Donald P. Hanna.",
    "This is an independent design study — your request was not sent. Please call 919-233-1933 or use the live form at caryplasticsurgery.com.": "Este é um estudo de design independente — o seu pedido não foi enviado. Por favor, telefone para o 919-233-1933 ou utilize o formulário ativo em caryplasticsurgery.com.",
    "Open today · until 5:00 pm": "Aberto hoje · até às 17:00",
    "Open today · until 12:00 pm": "Aberto hoje · até às 12:00",
    "Closed now · opens Monday 8:00 am": "Encerrado agora · abre segunda-feira às 8:00",
    "Accessibility": "Acessibilidade",
    "Privacy Policy": "Política de privacidade",
    "Terms & Conditions": "Termos e condições",
    "Site Map": "Mapa do site",
    "Sitemap": "Mapa do site",
    "Search Site": "Pesquisar no site",
    "Search": "Pesquisar",
    "Submit": "Submeter",
    "Search Results": "Resultados da pesquisa",
    "$50 New Patient Consultation": "Consulta de paciente novo · 50 $",
    "$50 New Patient\nConsultation": "Consulta de paciente novo\n50 $",
    "Plastic Surgery Services in Cary, NC": "Serviços de cirurgia plástica em Cary, NC",
    "Expertise in What Matters Most to You": "Experiência no que mais importa para si",
    "Board-Certified, Patient-Focused": "Certificado pelo conselho, centrado no paciente",
    "Dr. Donald P. Hanna": "Dr. Donald P. Hanna",
    "Patients trust him not only for his surgical skill—but for how he listens.": "Os pacientes confiam nele não só pela sua perícia cirúrgica — mas pela forma como escuta.",
    "With more than 30 years of surgical experience and board certification in plastic surgery, Dr. Hanna is known for his precision, honesty, and warm bedside manner.": "Com mais de 30 anos de experiência cirúrgica e certificação em cirurgia plástica, o Dr. Hanna é conhecido pela sua precisão, honestidade e modo de estar caloroso.",
    "Trusted by women across the Triangle and voted 'Best of Cary' - Dr. Hanna helps you look and feel your best, your way.": "A escolha de mulheres em todo o Triângulo e eleito «Best of Cary» — o Dr. Hanna ajuda-o a ter o melhor aspeto e a sentir-se no seu melhor, à sua maneira.",
    "Voted BEST Plastic Surgery in Cary, North Carolina for 7 Years!": "Eleito a MELHOR cirurgia plástica em Cary, Carolina do Norte, durante 7 anos!",
    "Voted BEST Plastic Surgery": "Eleito a MELHOR cirurgia plástica",
    "in Cary, North Carolina for 7 Years!": "em Cary, Carolina do Norte, durante 7 anos!",
    "Whether you're exploring a change or ready to take the next step, we're here to support you with care, transparency, and confidence.": "Quer esteja a explorar uma mudança ou pronto para o passo seguinte, estamos aqui para o acompanhar com cuidado, transparência e confiança.",
    "Load us into your address book": "Adicione-nos ao seu livro de endereços",
    "Monday": "Segunda-feira",
    "Tuesday": "Terça-feira",
    "Wednesday": "Quarta-feira",
    "Thursday": "Quinta-feira",
    "Friday": "Sexta-feira",
    "Saturday": "Sábado",
    "Sunday": "Domingo",
    "8:00 am - 5:00 pm": "8:00 – 17:00",
    "8:00 am - 12:00 pm": "8:00 – 12:00",
    "Text Message Opt-In Disclaimer": "Aviso de consentimento para mensagens de texto",
    "Do not fill out this field": "Não preencha este campo",
    "Previous": "Anterior",
    "Next": "Seguinte",
    "All years": "Todos os anos",
    "Skip to content": "Saltar para o conteúdo",
    "Switch to dark": "Mudar para o tema escuro",
    "Switch to light": "Mudar para o tema claro",
    "Open menu": "Abrir menu",
    "Close menu": "Fechar menu",
    "Directions": "Como chegar",
    "Call 919-233-1933": "Ligar para 919-233-1933",
    "MODEL": "MODELO",
    "MODEL · BREAST": "MODELO · MAMA",
    "MODEL · BODY": "MODELO · CORPO",
    "MODEL · FACE": "MODELO · ROSTO",
    "MODEL · COSMETIC": "MODELO · ESTÉTICA",
    "THE FOYER · 1608 KILDAIRE FARM RD": "O ÁTRIO DE ENTRADA · 1608 KILDAIRE FARM RD",
    "THE ENTRANCE · 1608 KILDAIRE FARM RD": "A ENTRADA · 1608 KILDAIRE FARM RD",
    "THE ATRIUM · 1608 KILDAIRE FARM RD": "O ÁTRIO · 1608 KILDAIRE FARM RD",
    "1608 KILDAIRE FARM RD": "1608 KILDAIRE FARM RD",
    "THE CONSULT": "A CONSULTA",
    "DR. DONALD P. HANNA": "DR. DONALD P. HANNA",
    "ACTUAL PATIENT": "PACIENTE REAL",
    "THE OPERATING ROOM": "O BLOCO OPERATÓRIO",
    "GALLERY": "GALERIA",
    "THE PRACTICE": "A CLÍNICA",
    "On this page": "Nesta página",
    "Request An Appointment": "Pedir uma consulta",
    "Request an Appointment": "Pedir uma consulta",
    "© 2025 All rights reserved.": "© 2025 Todos os direitos reservados.",
    "Breast Plastic Surgery": "Cirurgia plástica mamária",
    "Body Plastic Surgery": "Cirurgia plástica corporal",
    "Face Plastic Surgery": "Cirurgia plástica facial",
    "Cosmetic Plastic Surgery": "Cirurgia plástica estética",
    "Why Choose Dr. Hanna?": "Porquê escolher o Dr. Hanna?",
    "Frequently Asked Questions": "Perguntas frequentes",
    "State-of-the-Art Facility": "Instalações de vanguarda",
    "Individual results vary": "Os resultados individuais variam",
    "** Individual results vary": "** Os resultados individuais variam",
    "Cary Plastic Surgery": "Cary Plastic Surgery",
    "919-233-1933": "919-233-1933",
    "Home": "Início",
    "EN": "EN",
    "PT": "PT",
    "Theme": "Tema",
    "Avaliação original em inglês": "Avaliação original em inglês",
    "Original review in English": "Avaliação original em inglês",
    "No matching pages.": "Nenhuma página correspondente.",
    "Calling our office is a fast and convenient way to schedule an appointment. Our team will do whatever it takes to get you in at a date and time that's suitable for you.": "Telefonar para a clínica é uma forma rápida e cómoda de marcar uma consulta. A nossa equipa fará o possível para o receber numa data e hora que lhe convenham.",
    "If you would like to request an appointment online, please complete the following form. Our reception desk will accommodate the appointment request and contact you within one business day to confirm the date and time requested.": "Se pretender pedir uma consulta online, preencha o formulário seguinte. A receção tratará do pedido e contactá-lo-á no prazo de um dia útil para confirmar a data e a hora solicitadas.",
    "Call us at [919-233-1933](tel:+19192331933)": "Ligue-nos para o [919-233-1933](tel:+19192331933)",
    "By providing your phone number, you consent to receive SMS text messages from Cary Plastic Surgery for appointment reminders, marketing messages, and general two-way communication. Msg frequency varies. Msg & data rates may apply. Reply HELP for support. Reply STOP to opt out.": "Ao indicar o seu número de telefone, consente em receber mensagens SMS da Cary Plastic Surgery para lembretes de consultas, mensagens informativas e comunicação nos dois sentidos. A frequência das mensagens varia. Podem aplicar-se tarifas de mensagem e de dados. Responda HELP para apoio. Responda STOP para cancelar.",
}

REPLACEMENTS = [
    (re.compile(r"\bequipes\b", re.I), lambda m: "equipas" if m.group(0)[:1].islower() else "Equipas"),
    (re.compile(r"\bequipe\b", re.I), lambda m: "equipa" if m.group(0)[:1].islower() else "Equipa"),
    (re.compile(r"\bcontatos\b", re.I), lambda m: "contactos" if m.group(0)[:1].islower() else "Contactos"),
    (re.compile(r"\bcontato\b", re.I), lambda m: "contacto" if m.group(0)[:1].islower() else "Contacto"),
    (re.compile(r"\bregistros\b", re.I), lambda m: "registos" if m.group(0)[:1].islower() else "Registos"),
    (re.compile(r"\bregistro\b", re.I), lambda m: "registo" if m.group(0)[:1].islower() else "Registo"),
    (re.compile(r"\bagendamentos\b", re.I), lambda m: "marcações" if m.group(0)[:1].islower() else "Marcações"),
    (re.compile(r"\bagendamento\b", re.I), lambda m: "marcação" if m.group(0)[:1].islower() else "Marcação"),
    (re.compile(r"\bplanejamento\b", re.I), lambda m: "planeamento" if m.group(0)[:1].islower() else "Planeamento"),
    (re.compile(r"\bplanejar\b", re.I), lambda m: "planear" if m.group(0)[:1].islower() else "Planear"),
    (re.compile(r"\busuários\b", re.I), lambda m: "utilizadores" if m.group(0)[:1].islower() else "Utilizadores"),
    (re.compile(r"\busuário\b", re.I), lambda m: "utilizador" if m.group(0)[:1].islower() else "Utilizador"),
    (re.compile(r"\barquivos\b", re.I), lambda m: "ficheiros" if m.group(0)[:1].islower() else "Ficheiros"),
    (re.compile(r"\barquivo\b", re.I), lambda m: "ficheiro" if m.group(0)[:1].islower() else "Ficheiro"),
    (re.compile(r"\btela\b", re.I), lambda m: "ecrã" if m.group(0)[:1].islower() else "Ecrã"),
    (re.compile(r"\bcelular\b", re.I), lambda m: "telemóvel" if m.group(0)[:1].islower() else "Telemóvel"),
    (re.compile(r"\baplicativo\b", re.I), lambda m: "aplicação" if m.group(0)[:1].islower() else "Aplicação"),
    (re.compile(r"\bAumento de Seios\b"), "Aumento mamário"),
    (re.compile(r"\baumento de seios\b"), "aumento mamário"),
    (re.compile(r"\bseus seios\b"), "as suas mamas"),
]


def collect_strings():
    pages = json.load(open(PAGES))
    strings = []

    def add(s):
        if isinstance(s, str) and s.strip():
            strings.append(s)

    def walk(o):
        if isinstance(o, dict):
            for k in ("text", "h1", "sub", "title", "description"):
                add(o.get(k))
            if isinstance(o.get("items"), list):
                for it in o["items"]:
                    if isinstance(it, str):
                        add(it)
                    else:
                        walk(it)
            if isinstance(o.get("rows"), list):
                for row in o["rows"]:
                    for cell in row:
                        add(cell)
            if isinstance(o.get("bullets"), list):
                for b in o["bullets"]:
                    add(b)
            for v in o.values():
                if isinstance(v, (dict, list)):
                    walk(v)
        elif isinstance(o, list):
            for i in o:
                walk(i)

    walk(pages)
    if os.path.exists(EXTRA):
        extra = json.load(open(EXTRA))
        for s in extra:
            add(s)
    for s in OVERRIDES:
        add(s)
    # unique preserve order
    seen = set()
    uniq = []
    for s in strings:
        if s not in seen:
            seen.add(s)
            uniq.append(s)
    return uniq


def europeize(s: str) -> str:
    for rx, rep in REPLACEMENTS:
        s = rx.sub(rep, s)
    return s


def translate_one(text: str) -> str:
    if text in OVERRIDES:
        return OVERRIDES[text]
    if len(text) <= 2 or re.fullmatch(r"[\d\W]+", text):
        return text
    chunks = []
    if len(text) > 800:
        parts = re.split(r"(?<=[.!?])\s+", text)
        buf = ""
        groups = []
        for p in parts:
            if buf and len(buf) + len(p) > 700:
                groups.append(buf)
                buf = p
            else:
                buf = (buf + " " + p).strip()
        if buf:
            groups.append(buf)
    else:
        groups = [text]
    out = []
    for g in groups:
        last = None
        for attempt in range(4):
            try:
                last = ts.translate_text(g, translator="bing", from_language="en", to_language="pt-PT")
                if last and last.strip():
                    break
            except Exception:
                time.sleep(0.6 * (attempt + 1))
        out.append(last.strip() if last else g)
    return europeize(" ".join(out))


def main():
    strings = collect_strings()
    cache = {}
    if os.path.exists(CACHE):
        cache = json.load(open(CACHE))
    todo = [s for s in strings if s not in cache and s not in OVERRIDES]
    print(f"total {len(strings)} cached {len(cache)} todo {len(todo)}", flush=True)

    def work(s):
        return s, translate_one(s)

    done = 0
    with ThreadPoolExecutor(max_workers=4) as ex:
        futs = [ex.submit(work, s) for s in todo]
        for fut in as_completed(futs):
            s, pt = fut.result()
            cache[s] = pt
            done += 1
            if done % 25 == 0:
                json.dump(cache, open(CACHE, "w"), ensure_ascii=False)
                print(f"progress {done}/{len(todo)}", flush=True)
    for s, pt in OVERRIDES.items():
        cache[s] = pt
    # europeize cached machine strings too
    final = {}
    for s in strings:
        pt = cache.get(s) or OVERRIDES.get(s) or s
        if s not in OVERRIDES:
            pt = europeize(pt)
        final[s] = pt
    json.dump(cache, open(CACHE, "w"), ensure_ascii=False)
    json.dump(final, open(OUT, "w"), ensure_ascii=False)
    print("wrote", OUT, "keys", len(final), flush=True)


if __name__ == "__main__":
    main()
