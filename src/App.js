
import './App.css';
import { GitHubApi } from './components/API/GitHubApi';
import SampleApi from './components/API/sampleApi';
import Cards from './components/cards/Cards';
import Count from './components/cards/Count';
import { DarkMode } from './components/DarkMode/DarkMode';
import { LiveInput } from './components/forms/LiveInput';
import { SampleForm } from './components/forms/SampleForm';
import { SignupForm } from './components/forms/SignUpForm';
import { Todo } from './components/forms/TodoList';
import { LikeButtonComp } from './components/LikeButtonComp';
import { ParentToChild } from './components/Props/ParentToChild';
import TodoComp from './components/todoComponent/todoComp';
import GetColorPicker from './practice/GetColorPicker';
import GitApi from './practice/GitApi';
import { AddTodoList } from './practice/Todo';
import UserForm from './practice/UserForm';
import AppRoutes from './routes/routes';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from './practice/ContextTheme';



function App() {
  return (
    <>
    <ThemeProvider>
    {/* <Cards name="Sandeep" age={27} location= "AndhraPradesh"/> */}
    {/* <Count/> */}
    {/* <LikeButtonComp/> */}
    {/* <LiveInput/> */}
    {/* <SignupForm/> */}
    {/* <Todo/> */}
    {/* <AddTodoList/> */}
    {/* <GitApi/> */}
    {/* <GetColorPicker/> */}
    {/* <UserForm/> */}
    <AppRoutes/>
    <ToastContainer position="top-right" autoClose={3000} />
    {/* <ParentToChild/> */}
    {/* <DarkMode/> */}
    {/* <SampleApi/> */}
    {/* <GitHubApi/> */}
    {/* <TodoComp/> */}
    {/* <SampleForm/> */}
    </ThemeProvider>
    </>
  )
}

export default App;
