export default {
	async fetch(request: Request, env: any, ctx: ExecutionContext): Promise<Response> {
	  const url = new URL(request.url);
	  const path = url.pathname;
	  const searchParams = url.searchParams;

	  // Redirecciones específicas para Gandalf
	  if (path.startsWith("/gandalf-api")) {
		const gandalfUrl = `https://dev-gandalf-ar.onrender.com${path}${url.search}`;
		const newRequest = new Request(gandalfUrl, {
		  method: request.method,
		  headers: {
			...Object.fromEntries(request.headers),
			"Host": "hipno.com.ar"
		  },
		  body: request.body
		});
		return fetch(newRequest);
	  }

	  if (path.startsWith("/prod-gandalf-api")) {
		const gandalfUrl = `https://gandalf-api-prod.onrender.com${path}${url.search}`;
		const newRequest = new Request(gandalfUrl, {
		  method: request.method,
		  headers: {
			...Object.fromEntries(request.headers),
			"Host": "hipno.com.ar"
		  },
		  body: request.body
		});
		return fetch(newRequest);
	  }

	  if (path.startsWith("/gandalf-v2-prod")) {
		const gandalfUrl = `https://gandalf-v2-arg-prod.onrender.com${path}${url.search}`;
		const newRequest = new Request(gandalfUrl, {
		  method: request.method,
		  headers: {
			...Object.fromEntries(request.headers),
			"Host": "hipno.com.ar"
		  },
		  body: request.body
		});
		return fetch(newRequest);
	  }

	  if (path.startsWith("/gandalf-v2-dev")) {
		const gandalfUrl = `https://gandalf-v2-arg-dev.onrender.com${path}${url.search}`;
		const newRequest = new Request(gandalfUrl, {
		  method: request.method,
		  headers: {
			...Object.fromEntries(request.headers),
			"Host": "hipno.com.ar"
		  },
		  body: request.body
		});
		return fetch(newRequest);
	  }

	  const rutas = [
		"/old-site/",
		"/cancelar-compra",
		"/api/revalidate",
		"/api",
		"/_next",
		"/compromiso-descansados",
		"/locales-calm",
		"/opiniones-reales-de-clientes-reales",
		"/preguntas-frecuentes",
		"/quienes-somos",
		"/terminos-y-condiciones",
		"/colchones",
		"/bases",
		"/almohadas",
		"/ropa-de-cama",
		"/muebles",
		"/producto",
		"/favicon",
		"/cyber-monday",
		"/mantenimiento",
		"/gandalf-api",
		"/prod-gandalf-api",
		"/gandalf-v2-prod",
		"/gandalf-v2-dev",
		"/siestario-calm",
		"/test-pago",
		"/404",
		"/pick-up",
		"/envios",
		"/30-noches-de-prueba-en-casa",
		"/feria",
		"/checkout-pago",
		"/metodos-de-pago",
		"/hot-sale",
		"/accesorios",
		"/sitemap.xml",
		"/rueda-de-la-calma",
		"/seguimiento",
		"/clear-cache",
		"/test-nico",
		"/fonts",
		"/.well-known"
	  ];
	  const isFrontRoute = rutas.some(route => path.startsWith(route)) || path === "/";
  
	  if (path === "/") {
		const shouldGoToServer = searchParams.has("wc-ajax") || 
								searchParams.has("elementor-preview") || 
								searchParams.has("ver");
		
		if (shouldGoToServer) {
		  const serverUrl = `https://test.hipno.com.ar${path}${url.search}`;
		  const newRequest = new Request(serverUrl, {
			method: request.method,
			headers: {
			  ...Object.fromEntries(request.headers),
			  "Host": "hipno.com.ar"
			},
			body: request.body
		  });
		  return fetch(newRequest);
		}
	  }
  
	  if (isFrontRoute) {
		const serverUrl = `https://test.hipno.com.ar${path}${url.search}`;
		const newRequest = new Request(serverUrl, {
		  method: request.method,
		  headers: {
			...Object.fromEntries(request.headers),
			"Host": "hipno.com.ar"
		  },
		  body: request.body
		});
  
		return fetch(newRequest);
	  }

	  return fetch(request);
	}
  } satisfies ExportedHandler;