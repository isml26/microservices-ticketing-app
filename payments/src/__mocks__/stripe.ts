export const stripe = {
  charges: {
    // mockResolvedValue whenewer we call the create function
    // we are going to get back a promise that resolves itself with an empty object
    create: jest.fn().mockResolvedValue({
      id: "asdadasds",
    }),
  },
};
