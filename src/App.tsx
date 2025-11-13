import { DatasetProvider } from "./context/DatasetContext";
import Navbar from "./components/Navbar";
import FileUploader from "./components/FileUploader";
import TabsContainer from "./components/tabs/TabsContainer";

function App() {
  return (
    <DatasetProvider>
      <div className="min-h-screen bg-gray-50 text-gray-800">
        <Navbar />
        <main className="flex flex-col items-center justify-center mt-8">
          <FileUploader />
          <TabsContainer />
        </main>
      </div>
    </DatasetProvider>
  );
}

export default App;