import React, { useEffect } from "react";

export function AdSense() {
  useEffect(() => {
    // Verifica se o objeto adsbygoogle está disponível antes de tentar usá-lo
    if (window.adsbygoogle && process.env.NODE_ENV !== 'development') {
      try {
        window.adsbygoogle.push({});
      } catch (e) {
        console.error("Erro ao carregar anúncio do Google AdSense: ", e);
      }
    }
  }, []);

  return (
    <ins className="adsbygoogle"
      style={{ display: "block", textAlign: "center", margin: "20px 0" }}
      data-ad-client="ca-pub-2444150739550883"  // Seu ID de cliente AdSense
      data-ad-slot="1050917976"  // Seu ID do slot de anúncio
      data-ad-format="auto"
      data-full-width-responsive="true"></ins>
  );
}

export default AdSense;
