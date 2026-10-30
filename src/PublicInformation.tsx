import { CognitiveLevelHelp } from './learning/ObjectiveHelp';
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
      'TestLearn — Beta pública é uma aplicação educativa independente e gratuita, mantida por Gabriel Souza, para estudar o CTFL (Certified Tester Foundation Level), segundo o syllabus 4.0.1, e praticar inglês para QA. Contacto: testlearn808005@gmail.com.',
      'O banco tem 90 perguntas originais e cobre nominalmente os 64 objetivos examináveis. Cada simulação seleciona 40 perguntas segundo a estrutura de referência do exame. A prática permite estudar por tópico e consultar explicações.',
      'As perguntas e traduções foram revistas por IA. A aprovação académica humana independente está pendente e não existe calibração psicométrica. Cobertura e quotas não demonstram dificuldade equivalente ao exame oficial.',
      'Não existe afiliação, acreditação ou aprovação pelo ISTQB® ou PSTQB. As pontuações são autoavaliação local, não certificados nem previsão de aprovação. As soluções estão no código do cliente; não se trata de um exame supervisionado ou inviolável.',
    ],
    en: [
      'TestLearn — Public Beta is a free independent educational application maintained by Gabriel Souza for studying CTFL (Certified Tester Foundation Level), based on syllabus 4.0.1, and practising English for QA. Contact: testlearn808005@gmail.com.',
      'The bank contains 90 original questions with nominal coverage of the 64 examinable objectives. Each simulation selects 40 questions using the reference exam structure. Topic practice provides explanations.',
      'Questions and translations have been reviewed by AI. Independent human academic approval is pending and there is no psychometric calibration. Coverage and quotas do not establish official examination difficulty equivalence.',
      'There is no ISTQB® or PSTQB affiliation, accreditation or endorsement. Scores are local self-assessment, not certificates or predictions of success. Answers exist in the client code; this is not a supervised or tamper-proof examination.',
    ],
  },
  privacy: {
    pt: [
      'Não existem contas nem sincronização entre dispositivos. O TestLearn guarda o progresso no LocalStorage deste navegador, na chave testlearn.v1: respostas, ordem das perguntas e opções, revisão do conteúdo, marcações, posição, questões visitadas, feedback de prática confirmado, datas e prazo do exame, tempos entre interações e até 500 tentativas concluídas. As pontuações são calculadas a partir desses dados, não guardadas como credenciais.',
      'O idioma escolhido e o seed de seleção não são guardados explicitamente. Os tempos por questão podem incluir inatividade e não medem atenção. Dados manipulados no navegador podem alterar resultados.',
      'O código da aplicação não envia respostas ou resultados a um servidor e não inclui analytics, cookies de aplicação, fontes remotas ou scripts de terceiros. O alojamento é prestado pela Vercel; o carregamento do site pode implicar o tratamento de IP, dados de ligação e registos técnicos para disponibilização, segurança e operação do serviço. A informação do fornecedor sobre privacidade e conservação está disponível em https://vercel.com/legal/privacy-policy. O TestLearn não controla os prazos de conservação internos da Vercel e não afirma que não existem transferências internacionais.',
      'Pode apagar o progresso em Progresso → Apagar progresso, com confirmação. Isso afeta apenas os dados TestLearn nesta origem/navegador, não outros serviços. Limpar os dados do navegador também pode eliminá-los. Não existe recuperação ou cópia na cloud; mudar de domínio ou perfil não transfere o progresso.',
      'Em Progresso pode exportar um backup JSON local e importá-lo noutro navegador, com validação e confirmação. O ficheiro contém histórico de estudo e deve ser guardado em privado; não é enviado a serviços nem sincronizado automaticamente. A importação acrescenta só sessões novas sem conflito e preserva os registos locais. Um ficheiro editável não prova autenticidade nem certificação.',
      'Responsável pelo TestLearn: Gabriel Souza. Contacto para suporte e pedidos de privacidade: testlearn808005@gmail.com. Pode solicitar esclarecimentos ou exercer os direitos aplicáveis ao tratamento dos seus dados por este contacto. O progresso é guardado no seu próprio navegador; não envie dados pessoais, backups completos ou todo o LocalStorage para reportar um problema.',
    ],
    en: [
      'There are no accounts or cross-device synchronization. TestLearn stores progress in this browser’s LocalStorage under testlearn.v1: answers, question and option order, content revision, flags, position, visited questions, confirmed practice feedback, dates and exam deadline, time between interactions and up to 500 completed attempts. Scores are calculated from these records, not stored as credentials.',
      'The chosen language and selection seed are not explicitly stored. Question timing may include inactivity and does not measure attention. Manipulated browser data can change results.',
      'Application code does not send answers or results to a server and includes no analytics, application cookies, remote fonts or third-party scripts. The website is hosted by Vercel, which may process IP addresses, connection data and technical logs for delivery, security and operation of the service. See https://vercel.com/legal/privacy-policy for provider privacy and retention information. TestLearn does not control Vercel internal retention periods and does not claim that international transfers never occur.',
      'You can delete progress using Progress → Reset progress, with confirmation. This affects only TestLearn data for this browser/origin, not other services. Clearing browser data may also delete it. There is no cloud recovery or backup; changing domain or browser profile does not transfer progress.',
      'In Progress you can export a local JSON backup and import it in another browser, with validation and confirmation. The file contains study history and should be kept private; it is not uploaded or automatically synchronized. Import adds only new sessions without conflicts and preserves local records. An editable file proves neither authenticity nor certification.',
      'TestLearn operator: Gabriel Souza. Support and privacy contact: testlearn808005@gmail.com. You may request information or exercise applicable data protection rights through this address. Study progress is kept in your own browser; do not send personal information, full backups or your entire LocalStorage when reporting a problem.',
    ],
  },
  terms: {
    pt: [
      'Utilize este beta gratuito para aprendizagem e prática pessoal. Pode conter erros, interrupções ou perda de progresso se o armazenamento local for apagado, bloqueado ou estiver cheio. Mantenha um único separador de trabalho e confira os resultados.',
      'Não são perguntas oficiais. Não existe garantia de aprovação CTFL, equivalência de dificuldade, acreditação ou relação oficial com ISTQB/PSTQB. Uma pontuação simulada não é um certificado.',
      'As perguntas foram criadas para o TestLearn e são disponibilizadas para estudo pessoal e educativo. As referências, marcas e documentos oficiais pertencem aos respetivos titulares; o site não distribui os PDFs oficiais nem concede direitos de reprodução dos materiais do ISTQB/PSTQB. O repositório público não implica uma licença geral sobre conteúdos de terceiros.',
      'O TestLearn é um projeto gratuito e independente mantido por Gabriel Souza. Contacto: testlearn808005@gmail.com. Esta versão Beta é experimental; os conteúdos aguardam revisão académica humana e os resultados não constituem certificação. A utilização de materiais de terceiros permanece sujeita aos respetivos direitos.',
    ],
    en: [
      'Use this free beta for personal learning and practice. It may contain errors, interruptions or loss of progress if local storage is cleared, blocked or full. Use a single working tab and check your results.',
      'These are not official questions. There is no guarantee of CTFL success, equivalent difficulty, accreditation or official ISTQB/PSTQB relationship. A simulated score is not a certificate.',
      'Questions were created for TestLearn and are made available for personal educational practice. Official references, marks and documents belong to their respective owners. The site does not distribute official PDFs or grant rights to reproduce ISTQB/PSTQB material. A public repository does not imply a general licence over third-party content.',
      'TestLearn is a free independent project maintained by Gabriel Souza. Contact: testlearn808005@gmail.com. This Beta remains experimental; independent human academic review is pending and results do not constitute certification. Third-party material remains subject to its owners rights.',
    ],
  },
  help: {
    pt: [
      'Escolha Iniciar simulação para um exame de 40 perguntas. O modo normal dura 60 minutos; 75 minutos é uma opção de prática, não confirmação de elegibilidade oficial para tempo adicional. O relógio continua quando fecha ou recarrega a página e um exame expirado é terminado ao retomar.',
      'Cada pergunta indica quantas respostas selecionar. Nas perguntas de duas escolhas pode desmarcar uma opção para escolher outra. Só o conjunto exato vale um ponto; não há crédito parcial nem penalização por erro. O limiar de prática é 26/40, sem prever certificação.',
      'Use as marcações para rever perguntas, alterne PT-PT/EN e navegue antes de confirmar o fim. As soluções só aparecem após terminar o exame. Para estudar, escolha Praticar e filtre tópico, capítulo ou objetivo; esse modo não tem temporizador.',
      'Um único separador pode editar de cada vez. Para consultar sem reservar escrita, use «Libertar edição neste separador». Na outra página, use «Tentar obter acesso de escrita»; só será concedido se o navegador confirmar que está livre. Se o progresso tiver mudado, recarregue os dados guardados antes de editar. Não apague o armazenamento para resolver conflitos. Cada alteração só é aplicada depois da gravação síncrona confirmada; o estado mostra se está guardada ou se foi recusada. Se um arquivo histórico falhar, mantenha os dados e tente novamente: nunca são substituídos pelas perguntas atuais.',
      'Se surgir um erro de armazenamento, a última alteração não é aplicada e o progresso anterior mantém-se. Exporte uma cópia e verifique o espaço disponível; o limite é 500 sessões concluídas, sem eliminação automática das mais antigas. Registos incompatíveis ficam bloqueados até recuperação ou eliminação explícita. Não limpe dados para resolver um erro de carregamento. A edição requer um navegador atualizado com reserva segura de escrita e HTTPS (ou localhost durante desenvolvimento).',
      'Contacto de suporte e privacidade: testlearn808005@gmail.com (Gabriel Souza). Para reportar um problema, indique revisão do conteúdo, ID da pergunta, idioma, navegador, passos e mensagem; omita dados pessoais, respostas de terceiros e o LocalStorage completo.',
    ],
    en: [
      'Choose Start simulation for a 40-question exam. Normal time is 60 minutes; 75 minutes is a practice option, not confirmation of official extra-time eligibility. The timer continues while the page is closed or reloaded, and an expired exam is finished when resumed.',
      'Each question states how many answers to select. For two-answer questions, deselect an option to choose another. Only the exact set earns one point; no partial credit or penalty for mistakes. The practice threshold is 26/40 and does not predict certification.',
      'Flag questions for review, switch PT-PT/EN and navigate before confirming completion. Solutions appear only after finishing an exam. To study, choose Practice and filter by topic, chapter or objective; that mode has no timer.',
      'Only one tab can edit at a time. To browse without holding write access, choose Release editing in this tab. On the other page choose Retry write access; it is granted only if the browser confirms availability. If progress changed, reload saved data before editing. Do not clear storage to resolve conflicts. Each change is applied only after a confirmed synchronous write; the status shows whether it was saved or rejected. If a historical archive fails, keep the data and retry: it is never replaced with current questions.',
      'If a storage error appears, the last change is not applied and previous progress is retained. Export a copy and check available storage; the limit is 500 completed sessions, without automatically deleting the oldest. Incompatible records stay blocked until recovery or explicit reset. Do not clear data to fix a loading failure. Editing requires an updated browser with safe write access and HTTPS (or localhost during development).',
      'Support and privacy contact: testlearn808005@gmail.com (Gabriel Souza). When reporting a problem, provide the content revision, question ID, language, browser, steps and message; omit personal information, other people’s answers and the complete LocalStorage.',
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
      {page === 'help' && <CognitiveLevelHelp language={language} />}
      {languages.map((lang) => (
        <div key={lang} lang={lang === 'pt' ? 'pt-PT' : 'en'}>
          {language === 'both' && <h2>{publicTitles[page][lang]}</h2>}
          {page === 'help' && (
            <details>
              <summary>
                {lang === 'pt'
                  ? 'Estrutura do exame — detalhes técnicos'
                  : 'Exam structure — technical details'}
              </summary>
              <p>
                {lang === 'pt'
                  ? 'Blueprint é a estrutura de referência do exame: as quotas por capítulo, nível cognitivo e grupo de objetivos de aprendizagem (LO). O gerador aplica 29 grupos verificados na tabela ISTQB Exam Structures & Rules v1.19. Esta conformidade estrutural não certifica o conteúdo nem a dificuldade das perguntas.'
                  : 'Blueprint means the reference exam structure: quotas by chapter, cognitive level and learning-objective (LO) group. The generator applies 29 groups verified against ISTQB Exam Structures & Rules table v1.19. Structural compliance does not certify question content or difficulty.'}
              </p>
            </details>
          )}
          {content[page][lang].map((text) => (
            <p key={text}>{text}</p>
          ))}
        </div>
      ))}
    </section>
  );
}
