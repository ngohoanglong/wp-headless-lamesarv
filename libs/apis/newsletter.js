import fetcher from "./fetcher";
const newsletterMutation = `mutation newsletterMutation($email:String,$name:String){
	subscribe(input: {esfpx_email: $email, esfpx_name: $name }) {
	  subscribeId
	}
}`
export const newsletter = async (email, name) => {
    const { subscribe } = await fetcher({
        query: newsletterMutation,
        variables: {
            email,
            name
        }
    });
    return subscribe
};
