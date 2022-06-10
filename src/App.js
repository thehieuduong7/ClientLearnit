import "./App.css";
import { Route, Routes } from "react-router-dom";
import Landing from "./components/layout/Landing";
import "bootstrap/dist/css/bootstrap.min.css";
import ContextProvider from "./contexts";
import { About, Auth, Dashboard } from "./views";
import { ProtectedRoute } from "./components/routing";
import "font-awesome/css/font-awesome.css";
function App() {
	return (
		<div>
			<ContextProvider>
				<Routes>
					<Route path="/" element={<Landing />} />
					<Route path="/login" element={<Auth authRoute="login" />} />
					<Route path="/register" element={<Auth authRoute="register" />} />
					<Route
						path="/dashboard"
						element={
							<ProtectedRoute>
								<Dashboard />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/about"
						element={
							<ProtectedRoute>
								<About />
							</ProtectedRoute>
						}
					/>
				</Routes>
			</ContextProvider>
		</div>
	);
}

export default App;
