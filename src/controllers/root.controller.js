export async function getRoot(request, reply) {
  return reply.view("index", { title: "homepage" });
}
