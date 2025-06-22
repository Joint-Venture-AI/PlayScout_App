import { myDataSource } from "../../db/database";
import { Subscriber } from "./subscriber.entity";

const addAsSubscriber = async (data: { name: string; email: string }) => {
  try {
    console.log(data);
    const subscriberRepo = myDataSource.getRepository(Subscriber);

    const existing = await subscriberRepo.findOneBy({ email: data.email });
    if (existing) {
      return existing;
    }

    const subscriber = subscriberRepo.create({ ...data, isSubscribed: true });
    return await subscriberRepo.save(subscriber);
  } catch (err) {
    console.error("Error adding subscriber:", err);
    throw new Error("Failed to add subscriber");
  }
};
const getAllSubscriber = async () => {
  const subscriberRepo = myDataSource.getRepository(Subscriber);

  const allSubscriber = await subscriberRepo.find({
    where: { isSubscribed: true },
  });

  return allSubscriber;
};

export const SubscriberService = { addAsSubscriber, getAllSubscriber };
