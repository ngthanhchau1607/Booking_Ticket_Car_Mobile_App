import { createContext, useContext, useState } from 'react';

// Định nghĩa kiểu cho context
interface AppContextType {
    theme: string; 
    setTheme: (v: string) => void; 
    otp: any;
    setOtp: (v: any) => void;
    appState: IUserLogin | null;
    setAppState: (v: IUserLogin | null) => void;
}

// Tạo context với giá trị mặc định là null (nên có kiểm tra trước khi sử dụng)
const AppContext = createContext<AppContextType | null>(null);

interface IProps {
    children: React.ReactNode;
}

// Hook để sử dụng context
export const useCurrentApp = () => {
    const currentTheme = useContext(AppContext);

    // Kiểm tra nếu không có context thì ném lỗi
    if (!currentTheme) {
        throw new Error("AppContext must be used within a AppProvider");
    }

    return currentTheme;
}

// Component Provider cho context
const AppProvider = (props: IProps) => {
    const [theme, setTheme] = useState<string>("light");
    const [appState, setAppState] = useState<IUserLogin | null>(null); 
    const [otp, setOtp] = useState<any | null>(null);

    return (
        <AppContext.Provider value={{ theme, setTheme, otp, setOtp, appState, setAppState }}>
            {props.children}
        </AppContext.Provider>
    );
}

export default AppProvider;
