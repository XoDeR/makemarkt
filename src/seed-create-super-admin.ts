import { getPayload } from "payload";
import config from "@payload-config";
import "dotenv/config";
import { stripe } from "./lib/stripe";

const seed = async () => {
  const payload = await getPayload({ config });

  // delete previous Stripe account
  const adminTenantData = await payload.find({
    collection: "tenants",
    where: {
      name: {
        equals: "admin",
      },
    },
    limit: 1,
    pagination: false,
  });

  const adminAccountId = adminTenantData.docs?.[0]?.stripeAccountId || "";
  await stripe.accounts.del(adminAccountId);

  // Delete tenant
  await payload.delete({
    collection: "tenants",
    where: {
      name: {
        equals: "admin",
      },
    },
  });

  // Create new Stripe account
  const adminAccount = await stripe.accounts.create({});

  // Create tenant
  const adminTenant = await payload.create({
    collection: "tenants",
    data: {
      name: "admin",
      slug: "admin",
      stripeAccountId: adminAccount.id,
    }
  });

  // Delete previous user
  await payload.delete({
    collection: "users",
    where: {
      email: {
        equals: "admin@demo.com",
      },
    },
  });

  // Create new user
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