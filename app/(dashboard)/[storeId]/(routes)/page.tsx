import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs"

interface DashboardPageProps {
  params: { storeId: string }
}

const DashboardPage: React.FC<DashboardPageProps> = async ({
  params
}) => {

  // getting user name
  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId
    }
  })
  return (
    <div className="p-4">
      Acitve store: {store?.name}
    </div>
  );
}

export default DashboardPage
