import type { Metadata } from "next";
import Link from "next/link";
import { BRAND } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacidade — TAO Filmes",
  description: "Como a TAO Filmes trata dados pessoais neste site.",
};

export default function PrivacidadePage() {
  return (
    <article className="mx-auto max-w-3xl px-6 pt-32 pb-24 text-white md:px-10">
      <h1 className="font-serif text-5xl md:text-6xl">Política de privacidade</h1>
      <p className="mt-6 text-sm leading-relaxed text-white/70">
        A TAO Filmes, produtora de Belém do Pará, é a responsável pelos dados que você envia neste site. O contato é{" "}
        <a className="underline" href={`mailto:${BRAND.email}`}>{BRAND.email}</a>.
      </p>
      <h2 className="mt-10 font-serif text-3xl">O que coletamos</h2>
      <p className="mt-3 text-sm leading-relaxed text-white/70">
        Só o que o pedido precisa. No formulário da LGPD: nome, e-mail, tipo do pedido e a mensagem. No contato por WhatsApp ou e-mail, o que você escrever. Não pedimos documento, endereço nem dados de pagamento neste site.
      </p>
      <h2 className="mt-10 font-serif text-3xl">Para que serve</h2>
      <p className="mt-3 text-sm leading-relaxed text-white/70">
        Responder o seu pedido, cumprir a Lei Geral de Proteção de Dados e manter o site no ar. Não vendemos dados e não montamos perfil de navegação.
      </p>
      <h2 className="mt-10 font-serif text-3xl">Cookies e medição</h2>
      <p className="mt-3 text-sm leading-relaxed text-white/70">
        Não há Google Analytics, Meta Pixel nem outro script de anúncio. A escolha do aviso de cookies fica no seu navegador. Quem entra no painel recebe um cookie de sessão, só para esse acesso. O site consulta de tempos em tempos se houve uma atualização publicada, sem identificar você.
      </p>
      <h2 className="mt-10 font-serif text-3xl">Vídeos de terceiros</h2>
      <p className="mt-3 text-sm leading-relaxed text-white/70">
        Alguns trabalhos podem abrir player do YouTube ou do Vimeo. Esses serviços recebem o endereço de rede de quem assiste, pelas regras deles.
      </p>
      <h2 className="mt-10 font-serif text-3xl">Por quanto tempo</h2>
      <p className="mt-3 text-sm leading-relaxed text-white/70">
        O pedido da LGPD fica guardado só até a resposta e o prazo que a lei exigir. Depois pode ser apagado.
      </p>
      <h2 className="mt-10 font-serif text-3xl">Os seus direitos</h2>
      <p className="mt-3 text-sm leading-relaxed text-white/70">
        Você pode pedir acesso, correção, exclusão, informação sobre o uso e revogação do consentimento. Use o{" "}
        <Link href="/lgpd" className="underline">formulário da LGPD</Link>.
      </p>
      <p className="mt-10 text-xs leading-relaxed text-white/45">
        Este texto descreve o funcionamento atual do site. Ele não substitui uma revisão jurídica.
      </p>
    </article>
  );
}
