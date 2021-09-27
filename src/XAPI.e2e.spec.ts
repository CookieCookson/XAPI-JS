import XAPI from "./XAPI";

const credentials: {
  endpoint: string;
  username: string;
  password: string;
}[] = JSON.parse(process.env.LRS_CREDENTIALS_ARRAY);

credentials.forEach((credential) => {
  const endpoint: string = credential.endpoint || "";

  describe("xapi constructor", () => {
    test("can perform basic authentication challenges when no authorization process is required", () => {
      const noAuthXapi = new XAPI(endpoint);
      return noAuthXapi.getAbout().then((result) => {
        return expect(result.data).toEqual(
          expect.objectContaining({
            version: expect.any(Array),
          })
        );
      });
    });
  });
});
