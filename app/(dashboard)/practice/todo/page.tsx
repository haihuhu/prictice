'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowUpDownIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface TodoType {
  id: string;
  title: string;
  status: 'completed' | 'not completed';
  important: 'low' | 'medium' | 'high';
}

const todo: TodoType[] = [
  {
    id: uuidv4(),
    title: 'but egg',
    status: 'not completed',
    important: 'medium',
  },
  { id: uuidv4(), title: 'but milk', status: 'completed', important: 'low' },
  {
    id: uuidv4(),
    title: 'but cheese',
    status: 'not completed',
    important: 'medium',
  },
  {
    id: uuidv4(),
    title: 'but yogurt',
    status: 'not completed',
    important: 'high',
  },
  {
    id: uuidv4(),
    title: 'but butter',
    status: 'not completed',
    important: 'low',
  },
  { id: uuidv4(), title: 'but oil', status: 'not completed', important: 'low' },
  {
    id: uuidv4(),
    title: 'but rice',
    status: 'not completed',
    important: 'high',
  },
  {
    id: uuidv4(),
    title: 'but noodles',
    status: 'not completed',
    important: 'low',
  },
];

const importantCycle = {
  low: 'high',
  medium: 'low',
  high: 'medium',
};

const importantStyle = {
  high: 'bg-red-500',
  medium: 'bg-yellow-500',
  low: 'bg-blue-500',
};

const importantNumber = {
  high: 1,
  medium: 2,
  low: 3,
};

type FieldStatus = 'default' | 'complete' | 'important';
type OrderStatus = 'default' | 'desc' | 'asc';

const TodoPage = () => {
  const [todoList, setTodoList] = useState<TodoType[]>(todo);
  const [isMounted, setMounted] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [sortField, setSortField] = useState<FieldStatus>('default');
  const [sortOrder, setSortOrder] = useState<OrderStatus>('default');

  useEffect(() => {
    const savedTodos = localStorage.getItem('todoList');
    if (savedTodos) {
      try {
        const parsedTodo = JSON.parse(savedTodos);
        setTodoList(parsedTodo);
      } catch (error) {
        console.log('Failed to  parse the localStorage:', error);
      }
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) localStorage.setItem('todoList', JSON.stringify(todoList));
  }, [todoList, isMounted]);

  const addTodo = () => {
    if (!inputValue.trim()) return;
    setTodoList([
      ...todoList,
      { id: uuidv4(), title: inputValue, status: 'not completed', important: 'low' },
    ]);
    setInputValue('');
  };

  const deleteTodo = (id: string) => {
    setTodoList(todoList.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id: string) => {
    setTodoList(
      todoList.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              status: todo.status === 'completed' ? 'not completed' : 'completed',
            }
          : todo
      )
    );
  };

  const changeImportant = (id: string) => {
    setTodoList(
      todoList.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              important: importantCycle[todo.important] as 'low' | 'high' | 'medium',
            }
          : todo
      )
    );
  };

  const toggleSort = (field: FieldStatus) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  console.log(sortField, sortOrder);

  const sortedTodo = [...todoList].sort((a, b) => {
    if (sortField === 'complete') {
      return sortOrder === 'desc'
        ? a.status.localeCompare(b.status)
        : b.status.localeCompare(a.status);
    } else if (sortField === 'important') {
      return sortOrder === 'desc'
        ? importantNumber[a.important] - importantNumber[b.important]
        : importantNumber[b.important] - importantNumber[a.important];
    } else {
      return 0;
    }
  });

  return (
    <>
      <div className="flex flex-col  items-center mx-2">
        <h2 className="text-5xl my-2">ToDo</h2>
        {/* Add a new todo item */}
        <div className="flex w-full mx-auto gap-2 my-2">
          <Input
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
          />
          <Button variant="outline" onClick={() => addTodo()}>
            Add Todo
          </Button>
        </div>
        <div className="w-full overflow-x-auto">
          <table className="border-2 w-full">
            <thead>
              <tr className="border-b ">
                <th className="text-left px-2">
                  <span className="mr-2">Title</span>
                </th>
                <th className="text-center px-2">
                  {/* Sort by completion status when clicked */}
                  <div
                    className="flex items-center justify-center hover:text-blue-500 cursor-pointer"
                    onClick={() => toggleSort('complete')}
                  >
                    <span className="mr-2">Status</span>
                    <ArrowUpDownIcon />
                  </div>
                </th>
                <th className="text-center px-2">
                  {/* Sort by importance when clicked */}
                  <div
                    className="flex items-center justify-center hover:text-blue-500 cursor-pointer"
                    onClick={() => toggleSort('important')}
                  >
                    <span className="mr-2">Important</span>
                    <ArrowUpDownIcon />
                  </div>
                </th>
                <th className="text-right px-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {/* Render the todo list (sorted or unsorted) */}

              {sortedTodo.map((item) => {
                return (
                  <tr key={item.id} className="border-b">
                    <td
                      className="text-left  px-2 hover:text-blue-500 cursor-pointer"
                      onClick={() => toggleComplete(item.id)}
                    >
                      {item.title}
                    </td>
                    <td
                      className="text-center px-2 hover:text-blue-500 cursor-pointer"
                      onClick={() => toggleComplete(item.id)}
                    >
                      {item.status}
                    </td>
                    <td className="text-center px-2 ">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-white hover:text-blue-200 cursor-pointer transition-transform duration-200 hover:scale-110
                      ${importantStyle[item.important]}
                      `}
                        onClick={() => changeImportant(item.id)}
                      >
                        {item.important}
                      </span>
                    </td>
                    <td className="text-right px-2 py-2">
                      <Button onClick={() => deleteTodo(item.id)}>Delete</Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default TodoPage;
