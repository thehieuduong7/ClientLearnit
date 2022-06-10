import { AuthContext, default as AuthContextProvider } from "./AuthContext";
import { PostContext, default as PostContextProvider } from "./PostContext";
const ContextProvider = ({ children }) => {
	return (
		<AuthContextProvider>
			<PostContextProvider>{children}</PostContextProvider>
		</AuthContextProvider>
	);
};
export default ContextProvider;
export { AuthContext, PostContext };
