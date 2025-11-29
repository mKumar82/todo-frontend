import { API_URL } from "@/app/(api)/client";
import { createContext, ReactNode, useContext, useState } from "react";
import { getToken } from "./token";

type Todo = {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  created_at: string;
};

type TodosContextType = {
  todos: Todo[];
  fetchTodos: () => Promise<void>;
};

const TodosContext = createContext<TodosContextType | undefined>(undefined);

export const TodosProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const fetchTodos = async () => {
    try {
      const token = await getToken();
      if (!token) return;
      const res = await fetch(`${API_URL}/todos`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setTodos(data);
    } catch (err) {
      console.log("Fetch todos error:", err);
    }
  };

  return (
    <TodosContext.Provider value={{ todos, fetchTodos }}>
      {children}
    </TodosContext.Provider>
  );
};

export const useTodos = () => {
  const context = useContext(TodosContext);
  if (!context) throw new Error("useTodos must be used within TodosProvider");
  return context;
};
