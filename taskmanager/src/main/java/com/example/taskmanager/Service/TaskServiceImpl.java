package com.example.taskmanager.Service;

import com.example.taskmanager.Models.Task;
import com.example.taskmanager.Repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TaskServiceImpl implements TaskService{
    @Autowired
    private TaskRepository taskRepository;


    @Override
    public List<Task> getAllTasks() {
        return  taskRepository.findAll();
    }


    @Override
    public Task createTask(Task task) {
        return taskRepository.save(task);
    }

    @Override
    public List<Task> createTasks(List<Task> tasks) {
        return taskRepository.saveAll(tasks); // 👈 bulk save
    }
    @Override
    public Task updateTask(Long id, Task task) {
        Task existingTask = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found" + id));

        existingTask.setTitle(task.getTitle());
        existingTask.setDescription(task.getDescription());
        existingTask.setCompleted(task.isCompleted());

        if (task.isCompleted()) {
            existingTask.setCompletedAt(LocalDateTime.now());
        } else {
            existingTask.setCompletedAt(null);
        }
        return taskRepository.save(existingTask);
    }

    @Override
    public void deleteTask(Long id) {
      taskRepository.deleteById(id);
    }
}
