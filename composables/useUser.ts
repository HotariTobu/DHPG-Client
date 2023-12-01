import type User from "~/schemas/user"

export const useUser = (needLogin = false) => {
  const router = useRouter()

  const user = useState<User | null>('user', () => null)

  if (needLogin && user.value === null) {
    router.push('/login')
  }

  return user
}
