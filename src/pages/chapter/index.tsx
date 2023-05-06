import { useRouter } from "next/router";

export default function Chapter() {
  const router = useRouter();
  const id = router.query.id;

  return <h1> </h1>;
}
