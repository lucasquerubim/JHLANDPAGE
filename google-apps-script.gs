/**
 * ============================================================
 * ANUÁRIO JH 2026 — Backend (Google Apps Script)
 * ============================================================
 *
 * Este script:
 *   1. Recebe os dados do formulário do site
 *   2. Salva na planilha do Google Sheets
 *   3. Envia o Anuário JH 2026 (PDF) anexado por e-mail
 *
 * VEJA O README.md PARA O PASSO A PASSO COMPLETO DE INSTALAÇÃO.
 * ============================================================
 */

// ⚙️ ============= CONFIGURAÇÕES (EDITE AQUI) =============

const CONFIG = {
  // ID da planilha (cole aqui o ID que aparece na URL do Google Sheets)
  // Ex: https://docs.google.com/spreadsheets/d/AQUI_FICA_O_ID/edit
  PLANILHA_ID: 'COLE_AQUI_O_ID_DA_PLANILHA',

  // Nome da aba dentro da planilha
  ABA_NOME: 'Leads',

  // ID do arquivo PDF do anuário no Google Drive (anuariojh.pdf)
  // Ex: https://drive.google.com/file/d/AQUI_FICA_O_ID/view
  PDF_ANUARIO_ID: 'COLE_AQUI_O_ID_DO_PDF_NO_DRIVE',

  // Nome que aparecerá no anexo do email
  PDF_NOME_EXIBICAO: 'Anuario-JH-2026.pdf',

  // E-mail
  EMAIL_ASSUNTO: 'Seu Anuário JH 2026 chegou 📘',
  EMAIL_REMETENTE_NOME: 'JH Consultoria',
};

// ⚙️ =========================================================


/**
 * Endpoint POST chamado pelo formulário do site.
 */
function doPost(e) {
  try {
    const params = e.parameter;

    const nome    = (params.nome    || '').toString().trim();
    const email   = (params.email   || '').toString().trim();
    const empresa = (params.empresa || '').toString().trim();
    const origem  = (params.origem  || 'Site').toString().trim();

    if (!nome || !email) {
      return jsonResponse({ ok: false, error: 'Campos obrigatórios faltando.' });
    }

    if (!isValidEmail(email)) {
      return jsonResponse({ ok: false, error: 'E-mail inválido.' });
    }

    salvarNaPlanilha({ nome, email, empresa, origem });
    enviarAnuario({ nome, email });

    return jsonResponse({ ok: true, message: 'Lead salvo e e-mail enviado.' });

  } catch (err) {
    console.error('Erro no doPost:', err);
    return jsonResponse({ ok: false, error: err.toString() });
  }
}


/**
 * Salva os dados na aba da planilha.
 */
function salvarNaPlanilha({ nome, email, empresa, origem }) {
  const ss = SpreadsheetApp.openById(CONFIG.PLANILHA_ID);
  let sheet = ss.getSheetByName(CONFIG.ABA_NOME);

  if (!sheet) {
    sheet = ss.insertSheet(CONFIG.ABA_NOME);
  }

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Data/Hora', 'Nome', 'E-mail', 'Empresa', 'Origem']);
    sheet.getRange(1, 1, 1, 5)
      .setFontWeight('bold')
      .setBackground('#0A1628')
      .setFontColor('#C9A961');
    sheet.setFrozenRows(1);
  }

  const dataHora = Utilities.formatDate(
    new Date(),
    'America/Recife',
    'dd/MM/yyyy HH:mm:ss'
  );

  sheet.appendRow([dataHora, nome, email, empresa, origem]);
}


/**
 * Envia o e-mail com o Anuário JH 2026 anexado.
 */
function enviarAnuario({ nome, email }) {
  const primeiroNome = nome.split(' ')[0];

  // Pega o PDF do Drive
  const pdfBlob = DriveApp.getFileById(CONFIG.PDF_ANUARIO_ID)
    .getBlob()
    .setName(CONFIG.PDF_NOME_EXIBICAO);

  const htmlBody = construirHtmlEmail(primeiroNome);

  MailApp.sendEmail({
    to: email,
    subject: CONFIG.EMAIL_ASSUNTO,
    htmlBody: htmlBody,
    name: CONFIG.EMAIL_REMETENTE_NOME,
    attachments: [pdfBlob],
  });
}


/**
 * Monta o HTML do e-mail (template editorial sofisticado).
 */
function construirHtmlEmail(primeiroNome) {
  return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Anuário JH 2026</title>
</head>
<body style="margin:0; padding:0; background:#050B1A; font-family: Georgia, 'Times New Roman', serif; -webkit-font-smoothing: antialiased;">

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#050B1A; padding:40px 16px;">
    <tr>
      <td align="center">

        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px; width:100%; background:#0A1628; border:1px solid #1F3358;">

          <!-- HEADER com eyebrow dourada -->
          <tr>
            <td style="padding:50px 40px 16px; text-align:center; border-bottom:1px solid #1F3358;">
              <div style="font-family: 'Courier New', monospace; font-size:11px; letter-spacing:0.22em; color:#C9A961;">
                ━━━ EDIÇÃO MMXXVI ━━━
              </div>
            </td>
          </tr>

          <!-- HERO -->
          <tr>
            <td style="padding:48px 40px 32px; text-align:center;">
              <h1 style="font-family: Georgia, serif; font-size:54px; color:#F4EFE4; margin:0 0 4px; line-height:0.95; letter-spacing:-0.04em; font-weight:400;">
                Anuário
              </h1>
              <div style="font-family: Georgia, serif; font-style:italic; font-size:54px; color:#C9A961; line-height:0.95; letter-spacing:-0.04em; font-weight:400; margin-bottom: 24px;">
                2026
              </div>
              <div style="width:40px; height:1px; background:#C9A961; margin:0 auto 24px;"></div>
              <p style="font-family: Georgia, serif; font-style:italic; font-size:18px; color:#B4BCCF; margin:0; line-height:1.4;">
                Uma visão do ontem,<br>do hoje e do amanhã.
              </p>
            </td>
          </tr>

          <!-- BODY -->
          <tr>
            <td style="padding:24px 40px 8px;">
              <p style="font-family: 'Helvetica', Arial, sans-serif; color:#E8EDF5; font-size:17px; line-height:1.6; margin:0 0 24px;">
                Olá, ${escapeHtml(primeiroNome)}.
              </p>

              <p style="font-family: 'Helvetica', Arial, sans-serif; color:#B4BCCF; font-size:15px; line-height:1.75; margin:0 0 20px;">
                Obrigado pelo seu interesse no <strong style="color:#F4EFE4; font-weight:600;">Anuário JH 2026</strong>. O material está anexado a este e-mail e é seu para consultar quando quiser.
              </p>

              <p style="font-family: 'Helvetica', Arial, sans-serif; color:#B4BCCF; font-size:15px; line-height:1.75; margin:0 0 32px;">
                É um conteúdo construído para ser <em style="color:#E8EDF5;">usado</em> — em reuniões de planejamento, em conversas estratégicas e em decisões que vão pautar os próximos doze meses do seu negócio.
              </p>
            </td>
          </tr>

          <!-- DESTAQUE: O QUE TEM DENTRO -->
          <tr>
            <td style="padding:8px 40px 16px;">
              <div style="border:1px solid #1F3358; padding:24px;">
                <div style="font-family: 'Courier New', monospace; font-size:10px; letter-spacing:0.22em; color:#C9A961; margin-bottom:14px;">
                  ━ NESTA EDIÇÃO ━
                </div>

                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td style="padding:6px 0; font-family: Georgia, serif; font-style:italic; color:#C9A961; font-size:13px; width:32px;">I.</td>
                    <td style="padding:6px 0; font-family: 'Helvetica', Arial, sans-serif; color:#E8EDF5; font-size:13.5px; line-height:1.4;">Transformação Digital e IA</td>
                  </tr>
                  <tr>
                    <td style="padding:6px 0; font-family: Georgia, serif; font-style:italic; color:#C9A961; font-size:13px;">II.</td>
                    <td style="padding:6px 0; font-family: 'Helvetica', Arial, sans-serif; color:#E8EDF5; font-size:13.5px; line-height:1.4;">Customer Centric</td>
                  </tr>
                  <tr>
                    <td style="padding:6px 0; font-family: Georgia, serif; font-style:italic; color:#C9A961; font-size:13px;">III.</td>
                    <td style="padding:6px 0; font-family: 'Helvetica', Arial, sans-serif; color:#E8EDF5; font-size:13.5px; line-height:1.4;">Fórum Econômico Mundial 2026</td>
                  </tr>
                  <tr>
                    <td style="padding:6px 0; font-family: Georgia, serif; font-style:italic; color:#C9A961; font-size:13px;">IV.</td>
                    <td style="padding:6px 0; font-family: 'Helvetica', Arial, sans-serif; color:#E8EDF5; font-size:13.5px; line-height:1.4;">Guerra EUA–Irã</td>
                  </tr>
                  <tr>
                    <td style="padding:6px 0; font-family: Georgia, serif; font-style:italic; color:#C9A961; font-size:13px;">V.</td>
                    <td style="padding:6px 0; font-family: 'Helvetica', Arial, sans-serif; color:#E8EDF5; font-size:13.5px; line-height:1.4;">Cenário Econômico Nacional</td>
                  </tr>
                  <tr>
                    <td style="padding:6px 0; font-family: Georgia, serif; font-style:italic; color:#C9A961; font-size:13px;">VI.</td>
                    <td style="padding:6px 0; font-family: 'Helvetica', Arial, sans-serif; color:#E8EDF5; font-size:13.5px; line-height:1.4;">Reforma Tributária</td>
                  </tr>
                  <tr>
                    <td style="padding:6px 0; font-family: Georgia, serif; font-style:italic; color:#C9A961; font-size:13px;">VII.</td>
                    <td style="padding:6px 0; font-family: 'Helvetica', Arial, sans-serif; color:#E8EDF5; font-size:13.5px; line-height:1.4;">Panorama Regulatório</td>
                  </tr>
                  <tr>
                    <td style="padding:6px 0; font-family: Georgia, serif; font-style:italic; color:#C9A961; font-size:13px;">VIII.</td>
                    <td style="padding:6px 0; font-family: 'Helvetica', Arial, sans-serif; color:#E8EDF5; font-size:13.5px; line-height:1.4;">Dados Setoriais</td>
                  </tr>
                  <tr>
                    <td style="padding:6px 0; font-family: Georgia, serif; font-style:italic; color:#C9A961; font-size:13px;">IX.</td>
                    <td style="padding:6px 0; font-family: 'Helvetica', Arial, sans-serif; color:#E8EDF5; font-size:13.5px; line-height:1.4;">Hubs Logísticos no Brasil</td>
                  </tr>
                  <tr>
                    <td style="padding:6px 0; font-family: Georgia, serif; font-style:italic; color:#C9A961; font-size:13px;">X.</td>
                    <td style="padding:6px 0; font-family: 'Helvetica', Arial, sans-serif; color:#E8EDF5; font-size:13.5px; line-height:1.4;">Governança e Estrutura Empresarial</td>
                  </tr>
                  <tr>
                    <td style="padding:6px 0; font-family: Georgia, serif; font-style:italic; color:#C9A961; font-size:13px;">XI.</td>
                    <td style="padding:6px 0; font-family: 'Helvetica', Arial, sans-serif; color:#E8EDF5; font-size:13.5px; line-height:1.4;">Desempenho Institucional da JH</td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>

          <!-- QUOTE -->
          <tr>
            <td style="padding:36px 48px 32px; text-align:center;">
              <p style="font-family: Georgia, serif; font-style:italic; font-size:18px; color:#E5D4A1; line-height:1.45; margin:0;">
                "O futuro não é algo que acontece conosco; é algo que construímos hoje."
              </p>
              <p style="font-family: 'Helvetica', Arial, sans-serif; font-size:11px; letter-spacing:0.18em; text-transform:uppercase; color:#7886A3; margin:16px 0 0;">
                Jefferson Henrique S. A. · Presidente, JH
              </p>
            </td>
          </tr>

          <!-- DIVIDER -->
          <tr>
            <td style="padding:0 40px;">
              <div style="border-top:1px solid #1F3358;"></div>
            </td>
          </tr>

          <!-- ASSINATURA -->
          <tr>
            <td style="padding:32px 40px;">
              <p style="font-family: Georgia, serif; font-style:italic; color:#B4BCCF; font-size:15px; line-height:1.6; margin:0 0 16px;">
                Boa leitura. Que esse material seja útil nas suas decisões.
              </p>
              <p style="font-family: 'Helvetica', Arial, sans-serif; color:#F4EFE4; font-size:14px; margin:0; font-weight:600;">JH Consultoria Empresarial</p>
              <p style="font-family: Georgia, serif; font-style:italic; color:#7886A3; font-size:13px; margin:4px 0 16px;">Múltiplos caminhos, um objetivo.</p>

              <p style="font-family: 'Helvetica', Arial, sans-serif; font-size:12px; color:#7886A3; margin:0;">
                Contato: <a href="tel:+5581999578888" style="color:#C9A961; text-decoration:none;">+55 81 99957-8888</a>
                &nbsp;·&nbsp;
                <a href="https://instagram.com/jhconsultoriaoficial" style="color:#C9A961; text-decoration:none;">@jhconsultoriaoficial</a>
              </p>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="padding:24px 40px; background:#050B1A; text-align:center; border-top:1px solid #1F3358;">
              <p style="font-family: 'Courier New', monospace; font-size:10px; color:#7886A3; letter-spacing:0.18em; margin:0;">
                ANUÁRIO JH · EDIÇÃO MMXXVI
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
  `;
}


/**
 * Helpers
 */
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}


/**
 * Endpoint GET (apenas para teste no navegador)
 */
function doGet() {
  return ContentService
    .createTextOutput('Anuário JH 2026 — Endpoint ativo. Use POST para enviar dados.')
    .setMimeType(ContentService.MimeType.TEXT);
}


/**
 * Função de teste — execute manualmente para validar a configuração.
 * Vai salvar uma linha de teste e te enviar o e-mail com o PDF.
 */
function testarFluxo() {
  const meuEmail = Session.getActiveUser().getEmail();

  if (!meuEmail) {
    throw new Error('Não foi possível identificar seu e-mail. Execute manualmente pelo editor do Apps Script.');
  }

  salvarNaPlanilha({
    nome:    'Teste Manual',
    email:   meuEmail,
    empresa: 'JH Consultoria',
    origem:  'Teste interno',
  });

  enviarAnuario({
    nome:  'Teste Manual',
    email: meuEmail,
  });

  console.log('✅ Teste enviado! Verifique sua planilha e seu e-mail (' + meuEmail + ').');
}
