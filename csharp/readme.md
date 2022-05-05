# Csharp

## dotnet cli

### create a class library project

```bash
# from csharp/
mkdir HashTables
cd HashTables
dotnet new classlib -f "net5.0" # defaults location (-o) and name (-n) to current directory
```

### create a mstest project

```bash
# from csharp/
mkdir HashTablesTest
cd HashTablesTest
dotnet new mstest -f "net5.0" # defaults location (-o) and name (-n) to current directory
```

### run tests

run all tests
  ```bash
  # from csharp/
  dotnet test
  ```
run all tests for project
  ```bash
  # from csharp/
  dotnet test ArrayTest/
  ```
run single test
  ```
  ???
  ```

### getting help

```
dotnet --help
dotnet new --list
dotnet new classlib --help
dotnet new mstest --help
```

## Visual Studio

### Create a solution (i.e., a root-level container, e.g. "AlgorithmsInCSharp")

### [Create a class library project](https://docs.microsoft.com/en-us/dotnet/core/tutorials/library-with-visual-studio#create-a-class-library-project) (for a problem set, e.g., "Strings")

1. Right click solution (in navigator)
2. Add > New Project > Class Library
3. Name library (using UpperCamelCase, e.g. "Strings")
4. Target .NET 5.0 (or current)
5. Build > Build Solution (to verify)

### Add a console app to the solution (for a problem, e.g., "NSum")

### Add a project reference

https://docs.microsoft.com/en-us/dotnet/core/tutorials/library-with-visual-studio
