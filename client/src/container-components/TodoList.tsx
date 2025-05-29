import { List } from "../components/List";
import { ListItem } from "../components/ListItem";
import { AnimatePresence, motion } from "framer-motion";
import { useUserInteractionApi } from "../user-interactions/infrastructure/userInteractionStore";
import { useTodoStore } from "../user-interactions/infrastructure/todoStore";

export const TodoList = () => {
    const sortedTodos = useTodoStore();
    const { editTodo, removeTodo, toggleCheckTodo: toggleDoneTodo } = useUserInteractionApi();

    return (
        <List>
            <AnimatePresence>
                {sortedTodos.map(({ id, label, isDone }) => {
                    return (
                        <motion.div
                            key={id}
                            layout
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <ListItem
                                key={id}
                                label={label}
                                isDone={isDone}
                                onItemDelete={removeTodo(id)}
                                onItemDoneToggle={toggleDoneTodo(id)}
                                onItemLabelEdit={editTodo(id)}
                            />
                        </motion.div>
                    );
                })}
            </AnimatePresence>
        </List>
    );
};
