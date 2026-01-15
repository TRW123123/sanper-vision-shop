import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const productCategories = [
    {
      title: "Pergola-Systeme",
      href: "/pergola-systeme/",
      description: "Bioclimatic, Rolling Roof, Pergola Arc",
    },
    {
      title: "Verglasungssysteme",
      href: "/wintergarten-systeme/",
      description: "Giyotin-Glas, Wintergarten",
    },
    {
      title: "Textile Beschattung",
      href: "/zip-screen-systeme/",
      description: "Markisen, ZIP-Screen, Piston-Tavan",
    },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center justify-between">
        <a href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-semibold tracking-tight">Sanper</span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:items-center lg:gap-8">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <a href="/" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                  Startseite
                </a>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Produkte</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[600px] gap-3 p-6 md:grid-cols-2">

                    {productCategories.map((category) => (
                      <li key={category.href}>
                        <NavigationMenuLink asChild>
                          <a
                            href={category.href}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">
                              {category.title}
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              {category.description}
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <a href="/ueber-uns/" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                  Über uns
                </a>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <a href="/kontakt/" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                  Kontakt
                </a>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center gap-3">
            <Button variant="outline" asChild>
              <a href="/kontakt?type=katalog">Katalog anfordern</a>
            </Button>
            <Button asChild>
              <a href="/kontakt?type=beratung">Beratung anfragen</a>
            </Button>
          </div>
        </div>

        {/* Mobile menu button */}
        <button
          className="lg:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border">
          <div className="container py-4 space-y-4">
            <a
              href="/"
              className="block py-2 text-base font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Startseite
            </a>

            <div className="space-y-2">
              <div className="py-2 text-base font-medium">Produkte</div>
              <div className="pl-4 space-y-2">
                {productCategories.map((category) => (
                  <a
                    key={category.href}
                    href={category.href}
                    className="block py-2 text-sm text-muted-foreground hover:text-foreground"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {category.title}
                  </a>
                ))}
              </div>
            </div>

            <a
              href="/ueber-uns/"
              className="block py-2 text-base font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Über uns
            </a>

            <a
              href="/kontakt/"
              className="block py-2 text-base font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Kontakt
            </a>

            <div className="flex flex-col gap-3 pt-4">
              <Button variant="outline" asChild className="w-full">
                <a href="/kontakt?type=katalog">Katalog anfordern</a>
              </Button>
              <Button asChild className="w-full">
                <a href="/kontakt?type=beratung">Beratung anfragen</a>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
