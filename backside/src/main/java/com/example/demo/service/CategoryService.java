package com.example.demo.service;

import com.example.demo.entities.Category;
import com.example.demo.repository.CategoryRepository;
import org.springframework.stereotype.Service;

@Service

public class CategoryService {
    private static CategoryService instance;
    private static CategoryRepository categoryRepository;
    private CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }
    public static synchronized CategoryService getInstance() {
        if (instance == null) {
            instance = new CategoryService(categoryRepository);
        }
        return instance;
    }
    public void createCategory(String name) {
        Category category = new Category();
        category.setCategoryName(name);
        categoryRepository.save(category);
    }

}
