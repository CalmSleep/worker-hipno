export default {
	async fetch(request: Request) {
	  let url = new URL(request.url);
	  console.log("Solicitud recibida en:", url.href);
  
	  return new Response(`Worker está activo en: ${url.href}`, {
		status: 200,
	  });
	}
  };
  