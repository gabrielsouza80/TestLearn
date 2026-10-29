import type { Language, Localized } from './i18n';
export const publicTitles = {
  about: { pt: 'Sobre o TestLearn', en: 'About TestLearn' },
  privacy: { pt: 'Privacidade', en: 'Privacy' },
  terms: { pt: 'Termos e limites', en: 'Terms and limitations' },
  help: { pt: 'Ajuda e contacto', en: 'Help and contact' },
} satisfies Record<string, Localized>;
export type InformationPage = keyof typeof publicTitles;
const content: Record<InformationPage, { pt: string[]; en: string[] }> = {
  about: {
    pt: [
      'TestLearn — Public Beta é uma aplicação educativa independente e gratuita para estudar o CTFL (Certified Tester Foundation Level), segundo o syllabus 4.0.1, e praticar inglês para QA.',
      'O banco tem 90 perguntas originais e cobre nominalmente os 64 objetivos examináveis. Cada simulação seleciona 40 perguntas segundo os grupos do blueprint. A prática permite estudar por tópico e consultar explicações.',
      'As perguntas e traduções foram revistas por IA. A aprovação académica humana independente está pendente e não existe calibração psicométrica. Cobertura e quotas não demonstram dificuldade equivalente ao exame oficial.',
      'Não existe afiliação, acreditação ou aprovação pelo ISTQB® ou PSTQB. As pontuações são autoavaliação local, não certificados nem previsão de aprovação. As soluções estão no código do cliente; não se trata de um exame supervisionado ou inviolável.',
    ],
    en: [
      'TestLearn — Public Beta is a free independent educational application for studying CTFL (Certified Tester Foundation Level), based on syllabus 4.0.1, and practising English for QA.',
      'The bank contains 90 original questions with nominal coverage of the 64 examinable objectives. Each simulation selects 40 questions using the blueprint groups. Topic practice provides explanations.',
      'Questions and translations have been reviewed by AI. Independent human academic approval is pending and there is no psychometric calibration. Coverage and quotas do not establish official examination difficulty equivalence.',
      'There is no ISTQB® or PSTQB affiliation, accreditation or endorsement. Scores are local self-assessment, not certificates or predictions of success. Answers exist in the client code; this is not a supervised or tamper-proof examination.',
    ],
  },
  privacy: {
    pt: [
      'Não existem contas nem sincronização entre dispositivos. O TestLearn guarda o progresso no LocalStorage deste navegador, na chave testlearn.v1: respostas, ordem das perguntas e opções, revisão do conteúdo, marcações, posição, questões visitadas, feedback de prática confirmado, datas e prazo do exame, tempos entre interações e até 500 tentativas concluídas. As pontuações são calculadas a partir desses dados, não guardadas como credenciais.',
      'O idioma escolhido e o seed de seleção não são guardados explicitamente. Os tempos por questão podem incluir inatividade e não medem atenção. Dados manipulados no navegador podem alterar resultados.',
      'O código da aplicação não envia respostas ou resultados a um servidor e não inclui analytics, cookies de aplicação, fontes remotas ou scripts de terceiros. Pedidos ao servidor de alojamento para carregar o site e os arquivos históricos são necessários; o fornecedor pode processar endereços IP, datas e registos técnicos. Fornecedor, finalidade e retenção desses registos ainda exigem confirmação antes da publicação.',
      'Pode apagar o progresso em Progresso → Apagar progresso, com confirmação. Isso afeta apenas os dados TestLearn nesta origem/navegador, não outros serviços. Limpar os dados do navegador também pode eliminá-los. Não existe recuperação ou cópia na cloud; mudar de domínio ou perfil não transfere o progresso.',
      'O responsável e o canal público para pedidos de privacidade ainda não estão definidos nesta versão local em preparação. A publicação está bloqueada até essa informação ser completada e revista. Não envie dados pessoais nem todo o armazenamento do navegador para reportar um problema.',
    ],
    en: [
      'There are no accounts or cross-device synchronization. TestLearn stores progress in this browser’s LocalStorage under testlearn.v1: answers, question and option order, content revision, flags, position, visited questions, confirmed practice feedback, dates and exam deadline, time between interactions and up to 500 completed attempts. Scores are calculated from these records, not stored as credentials.',
      'The chosen language and selection seed are not explicitly stored. Question timing may include inactivity and does not measure attention. Manipulated browser data can change results.',
      'Application code does not send answers or results to a server and includes no analytics, application cookies, remote fonts or third-party scripts. Requests to the host to load the site and historical archives are necessary; the provider may process IP addresses, dates and technical logs. Provider, purpose and log retention still need confirmation before publication.',
      'You can delete progress using Progress → Reset progress, with confirmation. This affects only TestLearn data for this browser/origin, not other services. Clearing browser data may also delete it. There is no cloud recovery or backup; changing domain or browser profile does not transfer progress.',
      'The responsible operator and public privacy contact are not yet defined for this local release candidate. Publication is blocked until this information is completed and reviewed. Do not send personal information or your entire browser storage when reporting a problem.',
    ],
  },
  terms: {
    pt: [
      'Utilize este beta gratuito para aprendizagem e prática pessoal. Pode conter erros, interrupções ou perda de progresso se o armazenamento local for apagado, bloqueado ou estiver cheio. Mantenha um único separador de trabalho e confira os resultados.',
      'Não são perguntas oficiais. Não existe garantia de aprovação CTFL, equivalência de dificuldade, acreditação ou relação oficial com ISTQB/PSTQB. Uma pontuação simulada não é um certificado.',
      'As perguntas foram criadas para o TestLearn; as referências oficiais pertencem aos respetivos titulares e os PDFs oficiais não são distribuídos pelo site. Não é concedida uma licença geral de redistribuição dos materiais: a titularidade e as permissões de distribuição têm de ser confirmadas pelo responsável antes de publicar.',
      'A informação de privacidade, titularidade e contacto está em preparação para revisão pelo responsável. Estes textos não constituem uma declaração de conformidade jurídica. A publicação deste candidato não está autorizada.',
    ],
    en: [
      'Use this free beta for personal learning and practice. It may contain errors, interruptions or loss of progress if local storage is cleared, blocked or full. Use a single working tab and check your results.',
      'These are not official questions. There is no guarantee of CTFL success, equivalent difficulty, accreditation or official ISTQB/PSTQB relationship. A simulated score is not a certificate.',
      'Questions were created for TestLearn; official references belong to their respective rights holders and official PDFs are not distributed by the site. No general redistribution licence is granted: ownership and distribution permissions must be confirmed by the responsible operator before publication.',
      'Privacy, ownership and contact information is being prepared for operator review. These texts are not a statement of legal compliance. Publication of this release candidate is not authorized.',
    ],
  },
  help: {
    pt: [
      'Escolha Iniciar simulação para um exame de 40 perguntas. O modo normal dura 60 minutos; 75 minutos é uma opção de prática, não confirmação de elegibilidade oficial para tempo adicional. O relógio continua quando fecha ou recarrega a página e um exame expirado é terminado ao retomar.',
      'Cada pergunta indica quantas respostas selecionar. Nas perguntas de duas escolhas pode desmarcar uma opção para escolher outra. Só o conjunto exato vale um ponto; não há crédito parcial nem penalização por erro. O limiar de prática é 26/40, sem prever certificação.',
      'Use as marcações para rever perguntas, alterne PT-PT/EN e navegue antes de confirmar o fim. As soluções só aparecem após terminar o exame. Para estudar, escolha Praticar e filtre tópico, capítulo ou objetivo; esse modo não tem temporizador.',
      'O progresso fica neste navegador. Se outro separador o alterar, esta página interrompe gravações e permite recarregar os dados guardados. Se um arquivo histórico falhar, mantenha os dados e tente recarregar com ligação disponível; nunca são substituídos pelas perguntas atuais. Fechar/recarregar pode perder alterações que ainda não foram guardadas.',
      'Se surgir um erro de armazenamento, mantenha a página aberta: as respostas podem continuar só em memória. Registos incompatíveis são preservados até iniciar novo progresso ou confirmar a eliminação. Não limpe os dados para tentar resolver um erro de carregamento.',
      'Ainda não existe canal público de suporte nesta preparação local. Antes de publicar, o responsável deve disponibilizar um contacto real. Para um futuro relato, anote revisão do conteúdo, ID da pergunta, idioma, navegador, passos e mensagem; omita dados pessoais, respostas de terceiros e o LocalStorage completo.',
    ],
    en: [
      'Choose Start simulation for a 40-question exam. Normal time is 60 minutes; 75 minutes is a practice option, not confirmation of official extra-time eligibility. The timer continues while the page is closed or reloaded, and an expired exam is finished when resumed.',
      'Each question states how many answers to select. For two-answer questions, deselect an option to choose another. Only the exact set earns one point; no partial credit or penalty for mistakes. The practice threshold is 26/40 and does not predict certification.',
      'Flag questions for review, switch PT-PT/EN and navigate before confirming completion. Solutions appear only after finishing an exam. To study, choose Practice and filter by topic, chapter or objective; that mode has no timer.',
      'Progress stays in this browser. If another tab changes it, this page stops saving and offers to reload stored progress. If a historical archive fails, keep the data and reload with a working connection; it is never replaced by the current questions. Closing/reloading may lose changes not yet saved.',
      'If a storage error appears, keep the page open: responses may exist only in memory. Incompatible records are preserved until new progress is started or deletion confirmed. Do not clear data to fix a loading failure.',
      'There is no public support channel for this local preparation yet. The operator must provide a real contact before publishing. For a future report, note content revision, question ID, language, browser, steps and message; omit personal information, other people’s responses and the complete LocalStorage.',
    ],
  },
};
export default function PublicInformation({
  page,
  language,
}: {
  page: InformationPage;
  language: Language;
}) {
  const languages =
    language === 'both'
      ? (['en', 'pt'] as const)
      : ([language] as ('pt' | 'en')[]);
  return (
    <section className="panel public-information">
      {languages.map((lang) => (
        <div key={lang} lang={lang === 'pt' ? 'pt-PT' : 'en'}>
          {language === 'both' && <h2>{publicTitles[page][lang]}</h2>}
          {content[page][lang].map((text) => (
            <p key={text}>{text}</p>
          ))}
        </div>
      ))}
    </section>
  );
}
