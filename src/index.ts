export default {
	async fetch(request: Request, env: any, ctx: ExecutionContext): Promise<Response> {
	  const url = new URL(request.url);
	  const path = url.pathname;
	  const searchParams = url.searchParams;
  
	  // Rutas que deben ir al servidor (165.140.86.130)
	  const serverPaths = ["/public_html", "/lab", "/wp-admin", "/headless"];
	  const isServerRoute = serverPaths.some(route => path.startsWith(route));
  
	  // Ruta específica para /gandalf-api/token/index.php?param=*
	  console.log(path);
	  
	  const isGandalfRoute = path === "/gandalf-api/token/index.php"/*  && searchParams.has("param"); */

	  const isGandalftest = path === "/gandalf-api/health-check"
  
	  if (isServerRoute) {
		// Redirige al servidor (165.140.86.130)
		//va a tener que ser a subdominio porque cloudflare no pueed mandar solictudes a ips directas con proxy activado, sin proxy no funca el worker
		const serverUrl = `http://hipno.com.ar${path}${url.search}`;
		
		// Clona la request y modifica el "Host" si es necesario
		const newRequest = new Request(serverUrl, {
		  method: request.method,
		  headers: {
			...Object.fromEntries(request.headers),
			"Host": "hipno.com.ar"
		  },
		  body: request.body
		});
  
		return fetch(newRequest);
	  } else if (isGandalfRoute) {
		// Redirige a https://gandalf-project-middleware.onrender.com/gandalf-api/token
		const gandalfUrl = `https://gandalf-project-middleware.onrender.com/gandalf-api/token${url.search}`;
  
		// Clona la request y mantiene las cookies
		const newRequest = new Request(gandalfUrl, {
		  method: request.method,
		  headers: {
			...Object.fromEntries(request.headers),
			"Host": "hipno.com.ar"
		  },
		  body: request.body
		});
  
		// Envía la solicitud y devuelve la respuesta
		return fetch(newRequest);
	  }

	  if (isGandalftest) {
		// Redirige a https://gandalf-project-middleware.onrender.com/gandalf-api/token
		const gandalfUrl = `https://gandalf-project-middleware.onrender.com`;
  
		// Clona la request y mantiene las cookies
		const newRequest = new Request(gandalfUrl, {
		  method: request.method,
		  headers: {
			...Object.fromEntries(request.headers),
			"Host": "hipno.com.ar"
		  },
		  body: request.body
		});
  
		// Envía la solicitud y devuelve la respuesta
		return fetch(newRequest);
	  }
  
	  // Resto del tráfico al frontend (configurado en DNS de Cloudflare)
	  return fetch(request);
	}
  } satisfies ExportedHandler;