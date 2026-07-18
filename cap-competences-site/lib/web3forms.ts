// Envoi des formulaires du site via Web3Forms (site 100% statique, pas de backend).
// La clé est publique par conception (Web3Forms est fait pour être appelé depuis le navigateur).
const WEB3FORMS_ACCESS_KEY = "ee4ac009-c15d-47b1-ad54-d795e8af27a1";
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

export async function submitToWeb3Forms(fields: Record<string, FormDataEntryValue>, subject: string) {
  const res = await fetch(WEB3FORMS_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      access_key: WEB3FORMS_ACCESS_KEY,
      subject,
      from_name: "Site Cap Expertises",
      ...fields,
    }),
  });
  const result = await res.json();
  if (!result.success) throw new Error(result.message || "Échec de l'envoi");
  return result;
}
