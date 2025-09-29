"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";
import { ImportCurve } from "iconsax-react";
import CVSelectionModal from "./CVSelectionModal";
import PDFViewerModal from "./PDFViewerModal";

const DivParent = styled.div`
  .main-menu {
    position: fixed;
    top: 1rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1000;

    /* Liquid glass effect */
    background: rgba(26, 26, 26, 0.4);
    backdrop-filter: blur(20px) saturate(180%);
    -webkit-backdrop-filter: blur(20px) saturate(180%);

    /* Multiple layered shadows for depth */
    box-shadow: 
        /* Outer glow */ 0 0 40px rgba(255, 255, 255, 0.05),
      /* Main shadow */ 0 8px 32px rgba(0, 0, 0, 0.3),
      /* Inner light from top */ inset 0 2px 3px rgba(255, 255, 255, 0.2),
      /* Inner shadow from bottom */ inset 0 -2px 3px rgba(0, 0, 0, 0.2),
      /* Subtle inner glow */ inset 0 0 20px rgba(255, 255, 255, 0.05);

    /* Glass border effect */
    border: 1px solid rgba(255, 255, 255, 0.18);

    /* Pseudo glass refraction */
    overflow: hidden;

    border-radius: 1000px;
    width: 610px;
    height: 84px;
    justify-content: space-around;
    padding: 0 10px 0 21px;

    /* Smooth transitions */
    transition: all 0.3s ease;

    /* Add subtle animation on hover */
    &:hover {
      background: rgba(26, 26, 26, 0.5);
      box-shadow: 0 0 50px rgba(255, 255, 255, 0.08),
        0 10px 40px rgba(0, 0, 0, 0.4),
        inset 0 2px 4px rgba(255, 255, 255, 0.25),
        inset 0 -2px 4px rgba(0, 0, 0, 0.25),
        inset 0 0 25px rgba(255, 255, 255, 0.08);
    }
    /* Glass shine effect - Desktop only */
    @media (min-width: 991px) {
      &::before {
        content: "";
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(
          90deg,
          transparent,
          rgba(255, 255, 255, 0.05),
          transparent
        );
        transition: left 0.5s ease;
      }

      &:hover::before {
        left: 100%;
      }
    }
  }

  .btn {
    padding: 8px 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #d9e3f0;
    text-decoration: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 500;
  }
  .btn-download-cv {
    width: 116px;
    height: 52px;
    border-radius: 36px;
    display: flex;
    align-items: center;
    border: 1px solid #ffffff59 !important;
    background: white;
    cursor: pointer;
    transition: all 0.3s ease;
    color: #141212;
    font-size: 16px;
    &:hover {
      background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0.15) 0%,
        rgba(255, 255, 255, 0.08) 100%
      );
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(255, 255, 255, 0.1);
    }
  }
  .btn:hover {
    background-color: #373737;
  }
  .btn.active {
    border: none;
    color: #416ec2;
  }

  /* Mobile menu toggle */
  .mobile-menu-toggle {
    display: none;
    position: fixed;
    top: 1rem;
    left: 1rem;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #416ec2 0%, #2067c6 50%, #54b9f4 100%);
    border-radius: 50%;
    border: none;
    color: white;
    font-size: 20px;
    z-index: 1001;
    cursor: pointer;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    transition: all 0.3s ease;

    &:hover {
      transform: scale(1.1);
    }

    @media (max-width: 990px) {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  @media (max-width: 990px) {
    .main-menu {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      width: 100%;
      height: 60px;
      border-radius: 0;
      padding: 0 10px;
      transform: translateX(0);
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      gap: 5px;
      transition: all 0.3s ease;

      &.mobile-open {
        height: auto;
        flex-direction: column;
        padding: 20px;
        border-radius: 20px 20px 0 0;
        gap: 10px;
      }
    }

    .btn {
      padding: 8px 4px;
      font-size: 13px;
      justify-content: center;
      border-radius: 8px;
      flex: 1;

      .mobile-open & {
        width: 100%;
        padding: 12px;
        font-size: 16px;
      }
    }

    .btn-download-cv {
      width: auto;
      height: 45px;
      padding: 6px 10px;
      font-size: 13px;
      margin: 0;

      .mobile-open & {
        width: 100%;
        height: 52px;
        padding: 12px;
        margin-top: 10px;
        font-size: 16px;
      }

      span {
        .mobile-open & {
          display: inline;
        }
      }
    }

    /* Hide logo on mobile bottom bar, show in expanded menu */
    > a:first-child {
      display: none;

      .mobile-open & {
        display: flex;
      }
    }
  }

  @media (max-width: 990px) {
    .main-menu {
      height: 55px;
      padding: 0 8px;
      visibility: hidden;
      &.mobile-open {
        height: 100vh;
        padding: 15px;
        visibility: visible;
        display: block !important;
        bottom: unset;
        top: 0;
      }
    }
    .btn {
      width: 100%;
      font-size: 12px;
      padding: 6px 2px;
      border-bottom: 1px solid #ffffff14;
      border-radius: 0;
      height: 50px;
      flex: unset;
      &.active {
        border: 1px solid #2855a9!important;
        border-top: none!important;
        border-left: none!important;
        border-right: none!important;
color: #2855a9;
font-weight: 700;
      }
      .mobile-open{
        font-size: 14px;
        padding: 10px;
      }
    }

    .btn-download-cv {
      height: 40px;
      font-size: 12px;
      padding: 4px 8px;

      .mobile-open & {
        height: 48px;
        font-size: 14px;
        padding: 10px;
      }
    }
      .mobile-menu-toggle.open {
        left: unset;
        right: 1rem;
      }
  }
`;

export default function MainMenu() {
  const pathname = usePathname();
  const [isActive, setActive] = useState("");
  const [showCVModal, setShowCVModal] = useState(false);
  const [showPDFModal, setShowPDFModal] = useState(false);
  const [selectedCV, setSelectedCV] = useState<"thaotruong" | "ats" | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getActive = (value: string) => {
    return isActive.search(value) > -1 ? "active" : "";
  };

  useEffect(() => {
    const url = pathname === "/" ? "home" : pathname.replace("/", "");
    setActive(url);
  }, [pathname]);

  useEffect(() => {
    const url =
      window.location.pathname === "/"
        ? "home"
        : window.location.pathname.replace("/", "");
    setActive(url);
  }, []);

  const handleCVClick = () => {
    // Add query parameter to URL to trigger CV popup
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set("cv", "cv-thaotruong");
    window.history.pushState({}, "", currentUrl.toString());

    // Trigger a popstate event to notify AutoOpenCV component
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  const handleCVSelection = (type: "thaotruong" | "ats") => {
    setSelectedCV(type);
    setShowCVModal(false);
    setShowPDFModal(true);
  };

  const handleClosePDF = () => {
    setShowPDFModal(false);
    setSelectedCV(null);
  };

  return (
    <DivParent>
      {/* Mobile menu toggle button */}
      <button
        className={`mobile-menu-toggle ${mobileMenuOpen ? "open" : ""}`}
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle menu"
      >
        {mobileMenuOpen ? "✕" : "☰"}
      </button>

      <nav
        className={`main-menu d-flex align-items-center fixed-bottom ${
          mobileMenuOpen ? "mobile-open" : ""
        }`}
      >
        <Link
          href="/"
          onClick={() => {
            setActive("home");
            setMobileMenuOpen(false);
          }}
        >
          <Image src="/img/logo.svg" alt="Logo" width={24} height={24} />
        </Link>
        <Link
          href="/"
          className={`btn  ${getActive("home")}`}
          onClick={() => {
            setActive("home");
            setMobileMenuOpen(false);
          }}
        >
          Home
        </Link>
        <Link
          href="/portfolio"
          className={`btn  ${getActive("portfolio")}`}
          onClick={() => {
            setActive("portfolio");
            setMobileMenuOpen(false);
          }}
        >
          Portfolio
        </Link>
        <Link
          href="/about"
          className={`btn  ${getActive("about")}`}
          onClick={() => {
            setActive("about");
            setMobileMenuOpen(false);
          }}
        >
          About
        </Link>
        <Link
          href="/contact"
          className={`btn  ${getActive("contact")}`}
          onClick={() => {
            setActive("contact");
            setMobileMenuOpen(false);
          }}
        >
          Contact
        </Link>
        <div
          className="btn btn-download-cv p-2 border"
          onClick={() => {
            handleCVClick();
            setMobileMenuOpen(false);
          }}
        >
          <ImportCurve size="24" color="#141212" className="me-2" />
          <span>My CV</span>
        </div>
      </nav>
      {/* CV Selection Modal */}
      <CVSelectionModal
        show={showCVModal}
        onHide={() => setShowCVModal(false)}
        onSelect={handleCVSelection}
      />

      {/* PDF Viewer Modal */}
      <PDFViewerModal
        show={showPDFModal}
        onHide={handleClosePDF}
        cvType={selectedCV}
      />
    </DivParent>
  );
}
