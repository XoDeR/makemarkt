import { getPayload } from "payload";
import config from "@payload-config";
import "dotenv/config";

const seed = async () => {
  const payload = await getPayload({ config });

  await payload.delete({
    collection: "tenants",
    where: {
      name: {
        equals: "admin",
      },
    },
  });

  const adminTenant = await payload.create({
    collection: "tenants",
    data: {
      name: "admin",
      slug: "admin",
      stripeAccountId: "admin",
    }
  });

  await payload.delete({
    collection: "users",
    where: {
      email: {
        equals: "admin@demo.com",
      },
    },
  });

  await payload.create({
    collection: "users",
    data: {
      email: "admin@demo.com",
      password: "demo",
      roles: ["super-admin"],
      username: "admin",
      tenants: [
        {
          tenant: adminTenant.id
        },
      ]
    }
  })
}

try {
  await seed();
  console.log('Seeding completed with success');
  process.exit(0);
} catch (error) {
  console.error('Error during seeding: ', error);
  process.exit(1);
}