import { Ticket } from "../tickets";

it("implements optimistic concurrency control", async () => {
  const ticket = Ticket.build({
    title: "concert",
    price: 5,
    userId: "123",
  });

  await ticket.save();

  const firstInstance = await Ticket.findById(ticket.id);
  const secondIntance = await Ticket.findById(ticket.id);

  firstInstance!.set({ price: 10 });
  secondIntance!.set({ price: 15 });

  await firstInstance!.save();

  await expect(secondIntance!.save()).rejects.toThrow();
});

it("increments the version number on multiple saves", async () => {
  const ticket = Ticket.build({
    title: "concert",
    price: 20,
    userId: "123",
  });

  await ticket.save();
  expect(ticket.version).toEqual(0);
  await ticket.save();
  expect(ticket.version).toEqual(1);
  await ticket.save();
  expect(ticket.version).toEqual(2);
});
