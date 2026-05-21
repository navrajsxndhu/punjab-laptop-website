import { Metadata } from 'next';
import { PageHero } from '@/components/common/PageHero';
import { SEO } from '@/lib/constants';

export const metadata: Metadata = {
  title: `License | ${SEO.defaultTitle}`,
  description: 'License and copyright information for Punjab Laptop Sirsa.',
};

export default function LicensePage() {
  const currentYear = new Date().getFullYear();

  return (
    <main className="min-h-screen bg-background pb-20">
      <PageHero 
        title="License & Copyright" 
        description="Terms of use and intellectual property rights." 
      />

      <div className="container-narrow py-12">
        <div className="card-premium p-8 lg:p-12 prose prose-slate max-w-none">
          <h3>Copyright © {currentYear} Punjab Laptop Sirsa. All rights reserved.</h3>
          
          <p>
            The content, design, graphics, and other materials related to this website are protected under applicable copyrights, trademarks, and other proprietary rights. 
            The copying, redistribution, use, or publication by you of any such matters or any part of the website is strictly prohibited without explicit written permission.
          </p>

          <h4>Software and Codebase</h4>
          <p>
            The software, codebase, and UI design systems used to operate this website are proprietary and remain the intellectual property of the developers. 
            Unauthorized cloning, modification, or distribution of the source code is strictly prohibited.
          </p>
          <p>
            Designed & Developed by <strong>Navraj Sandhu</strong>.
          </p>

          <h4>Trademarks</h4>
          <p>
            "Punjab Laptop Sirsa" and "Punjab Laptop Solution" are trademarks of the respective business owners. 
            Other product and company names mentioned on the website may be trademarks of their respective owners.
          </p>

          <h4>Permissions</h4>
          <p>
            For permission requests regarding the use of website content or assets, please contact us via the provided communication channels on our Contact page.
          </p>
        </div>
      </div>
    </main>
  );
}
