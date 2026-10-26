export const config = {
  runtime: 'edge',
  regions: ['iad1'] // Жесткая привязка к Вашингтону, США
};

export default async function handler(request) {
  const url = new URL(request.url);
  const targetUrl = new URL(url.pathname + url.search, "https://generativelanguage.googleapis.com");
  
  const headers = new Headers(request.headers);
  // Зачищаем все заголовки, выдающие оригинальное местоположение
  headers.delete("x-forwarded-for");
  headers.delete("x-real-ip");
  headers.delete("x-vercel-forwarded-for");
  headers.delete("x-vercel-ip-country");
  headers.delete("forwarded");

  return fetch(targetUrl.toString(), {
    method: request.method,
    headers: headers,
    body: request.body
  });
}
