package com.example.taskmanager.Controller;

import com.example.taskmanager.Models.Task;
import com.example.taskmanager.Service.TaskService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "http://localhost:5173")
public class TaskController {
    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

        @GetMapping
        public List<Task> getAllTasks() {
            return taskService.getAllTasks();
        }

        @PostMapping
        public Task createTasks(@RequestBody Task tasks){
        return taskService.createTask(tasks);
        }

      @PostMapping("/bulk")
       public List<Task> createTasks(@RequestBody List<Task> tasks) {
        return taskService.createTasks(tasks);
      }



    @PutMapping("/{id}")
        public Task updateTask(@PathVariable Long id, @RequestBody Task task) {
            return taskService.updateTask(id, task);
        }

        @DeleteMapping("/{id}")
        public void deleteTask(@PathVariable Long id) {
            taskService.deleteTask(id);
        }
    }


