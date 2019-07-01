var documenterSearchIndex = {"docs":
[{"location":"#Gridap.jl-1","page":"Home","title":"Gridap.jl","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"Documentation of the Gridap library.","category":"page"},{"location":"#Introduction-1","page":"Home","title":"Introduction","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"Gridap provides a set of tools for the grid-based approximation of partial differential equations (PDEs) written in the Julia programming language. The goal is to provide a user friendly interface to a rich set of discretization techniques such as conforming and discontinuous Galerkin methods, embedded domain techniques, and adaptive mesh refinement.","category":"page"},{"location":"#How-to-use-this-documentation-1","page":"Home","title":"How to use this documentation","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"The first step for new users is to visit the Getting Started page.\nA detailed description of the software components is available in the Manual page.\nThe API reference is found in the API page.\nGuidelines for developers of the Gridap project is found in the Developer's Guide page.","category":"page"},{"location":"#Tutorials-1","page":"Home","title":"Tutorials","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"In addition to these documentation pages, a set of tutorials written in jupyter notebooks will be available.","category":"page"},{"location":"#Julia-educational-resources-1","page":"Home","title":"Julia educational resources","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"A basic knowledge of the Julia programming language is needed to use the Gridap package. Here, a list of resources to get started with this programming language.","category":"page"},{"location":"#","page":"Home","title":"Home","text":"Official webpage docs.julialang.org\nOfficial list of learning resources julialang.org/learning","category":"page"},{"location":"pages/getting-started/#Getting-Started-1","page":"Getting Started","title":"Getting Started","text":"","category":"section"},{"location":"pages/getting-started/#Installation-requirements-1","page":"Getting Started","title":"Installation requirements","text":"","category":"section"},{"location":"pages/getting-started/#","page":"Getting Started","title":"Getting Started","text":"At the moment, Gridap requires at least Julia version 1.1.","category":"page"},{"location":"pages/getting-started/#","page":"Getting Started","title":"Getting Started","text":"Gridap has been tested on Linux and Mac Os operating systems.","category":"page"},{"location":"pages/getting-started/#Installation-1","page":"Getting Started","title":"Installation","text":"","category":"section"},{"location":"pages/getting-started/#","page":"Getting Started","title":"Getting Started","text":"Gridap is a registered package. Thus, the installation should be straight forward using the Julia's package manager Pkg:","category":"page"},{"location":"pages/getting-started/#","page":"Getting Started","title":"Getting Started","text":"using Pkg\nPkg.add(\"Gridap\")","category":"page"},{"location":"pages/getting-started/#","page":"Getting Started","title":"Getting Started","text":"For further information about how to install and manage Julia packages, see the Pkg documentation.","category":"page"},{"location":"pages/getting-started/#First-example-1","page":"Getting Started","title":"First example","text":"","category":"section"},{"location":"pages/getting-started/#","page":"Getting Started","title":"Getting Started","text":"Solve a Poisson problem on the unit square with Dirichlet boundary conditions","category":"page"},{"location":"pages/getting-started/#","page":"Getting Started","title":"Getting Started","text":"using Gridap\nimport Gridap: ∇\n\n# Define manufactured functions\nufun(x) = x[1] + x[2]\nufun_grad(x) = VectorValue(1.0,1.0)\n∇(::typeof(ufun)) = ufun_grad\nbfun(x) = 0.0\n\n# Construct the discrete model\nmodel = CartesianDiscreteModel(domain=(0.0,1.0,0.0,1.0), partition=(4,4))\n\n# Construct the FEspace\norder = 1\ndiritag = \"boundary\"\nfespace = ConformingFESpace(Float64,model,order,diritag)\n\n# Define test and trial spaces\nV = TestFESpace(fespace)\nU = TrialFESpace(fespace,ufun)\n\n# Define integration mesh and quadrature\ntrian = Triangulation(model)\nquad = CellQuadrature(trian,order=2)\n\n# Define the source term\nbfield = CellField(trian,bfun)\n\n# Define forms of the problem\na(v,u) = inner(∇(v), ∇(u))\nb(v) = inner(v,bfield)\n\n# Define Assembler\nassem = SparseMatrixAssembler(V,U)\n\n# Define the FEOperator\nop = LinearFEOperator(a,b,V,U,assem,trian,quad)\n\n# Define the FESolver\nls = LUSolver()\nsolver = LinearFESolver(ls)\n\n# Solve!\nuh = solve(solver,op)\n\n# Define exact solution and error\nu = CellField(trian,ufun)\ne = u - uh\n\n# Define norms to measure the error\nl2(u) = inner(u,u)\nh1(u) = a(u,u) + l2(u)\n\n# Compute errors\nel2 = sqrt(sum( integrate(l2(e),trian,quad) ))\neh1 = sqrt(sum( integrate(h1(e),trian,quad) ))\n\n@assert el2 < 1.e-8\n@assert eh1 < 1.e-8\n\n# Write the numerical solution, the manufactured solution, and the error\n# in a vtu file\nwritevtk(trian,\"results\",nref=4,cellfields=[\"uh\"=>uh,\"u\"=>u,\"e\"=>e])","category":"page"},{"location":"pages/manual/#Manual-1","page":"Manual","title":"Manual","text":"","category":"section"},{"location":"pages/api/#API-1","page":"API","title":"API","text":"","category":"section"},{"location":"pages/dev/#Developer's-Guide-1","page":"Developer's Guide","title":"Developer's Guide","text":"","category":"section"}]
}
