export const natsWrapper = {
  client: {
    publish: jest
      .fn()
      //anytime when we call the publish funciton we actually executed the fallowing function
      .mockImplementation(
        (subject: string, data: string, callback: () => void) => {
          callback();
        }
      ),
  },
};
