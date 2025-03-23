# Performance Profiling Task

## Initial Profiling with React Dev Tools Profiler 

## Sort by population 

- **Commit Duration**: 67.5ms
- **Render Duration**: 
  - `Countries`: 5.3ms.
  - `Card`: 2.1ms (per item)
- **Flame Graph**: The Countries component took the majority of the rendering time, which is expected as it handles the list of countries.

Each Card component rendered quickly, indicating efficient rendering of individual items.
- **Ranked Chart**: Countries was the most time-consuming component, followed by multiple Card components.

Screenshots:
Below are the screenshots from the React Dev Tools Profiler:


![alt text](image-1.png)
![alt text](image-2.png)
