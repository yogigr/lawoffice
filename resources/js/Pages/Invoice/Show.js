import React from 'react';
import Authenticated from '@/Layouts/Authenticated';
import Company from '../Setting/Company';
import { backgroundSize } from 'tailwindcss/defaultTheme';
import { DownloadIcon, OfficeBuildingIcon } from '@heroicons/react/outline';

const Show = (props) => {
  const { invoice, banks } = props
  return (
    <Authenticated props={props} title="Invoice detail">
      <div className='grid grid-cols-1 gap-y-2 sm:grid-cols-3 sm:gap-x-2'>
        <div id='payment' className='bg-white shadow p-6 sm:order-last'>
          {
            invoice.is_paid ? (
              <>
                <p className='font-bold'>Kepada Yth, {invoice.client.name}</p>
                <p>Terima kasih telah melakukan pembayaran.</p>
              </>
            ) : (
              <div className='grid grid-cols-1 gap-y-3'>
                <p className='font-bold'>Kepada Yth, {invoice.client.name}</p>
                <p className='text-sm'>
                  Kami menerima pembayaran dari berbagai Bank di Indonesia dengan berbagai cara, diantaranya Internet Banking, Transfer ATM, m-Banking, SMS Banking, Setoran Tunai. Seluruh pembayaran produk & layanan dapat dilakukan pada rekening bank berikut ini.
                </p>
                <p className='text-sm'>Jumlah yang harus di bayar adalah <span className='font-bold'>{invoice.total}</span></p>
                <p className='text-sm'>
                  Mohon cantumkan berita transfer <span className='font-bold'>{invoice.number}</span> pada pembayaran anda.
                </p>

                <a
                  className='bg-indigo-600 text-white w-full px-3 py-3 hover:bg-indigo-700 flex items-center justify-center'
                  href={route('invoice.pdf', invoice.id)}
                  target="_blank"
                >
                  <DownloadIcon className='w-4 h-4 mr-1' />
                  Download Invoice
                </a>

                <div className='grid grid-cols-1 gap-y-2'>
                  {
                    banks.map((bank, index) => (
                      <div key={index} className='shadow p-4 text-center bg-gray-100'>
                        <p className='text-indigo-600'>{bank.name}</p>
                        <p className='text-gray-700'>{bank.number}</p>
                        <p className='text-gray-700'>{bank.owner}</p>
                      </div>
                    ))
                  }
                </div>
              </div>
            )
          }
        </div>
        <div id="invoice" className='bg-white shadow p-10 sm:col-span-2 flex flex-col space-y-5'>
          <div className='flex justify-between items-center'>
            <div>
              <img src={invoice.logo} alt="" className='h-16' />
            </div>
            <div className='text-right text-sm'>
              <p>
                <span className='font-bold mr-1'>Invoice Date</span>
                {invoice.date}
              </p>
              <p>
                <span className='font-bold mr-1'>Due Date</span>
                {invoice.due_date}
              </p>
            </div>
          </div>
          <div className='text-right'>
            <h2 className='text-lg font-bold text-gray-700'>Invoice #{invoice.number}</h2>
            <h3 className={`text-lg font-bold ${invoice.is_paid ? 'text-green-600' : 'text-red-700'}`}>
              {invoice.is_paid ? 'Paid' : 'Unpaid'}
            </h3>
          </div>
          <div className='flex justify-between items-center'>
            <div>
              <p className='font-bold text-lg'>Pay To:</p>
              <p className='text-sm'>{invoice.company.name}</p>
              <p className='text-xs' dangerouslySetInnerHTML={{ __html: invoice.company.address }}></p>
              <p className='text-xs'>{invoice.company.phone}</p>
            </div>
            <div>
              <p className='font-bold text-lg'>Invoices To:</p>
              <p className='text-sm'>{invoice.client.name}</p>
              <p className='text-xs' dangerouslySetInnerHTML={{ __html: invoice.client.address }}></p>
              <p className='text-xs'>{invoice.client.phone}</p>
            </div>
          </div>
          <div>
            <h2 className='font-bold text-lg'>Invoice Items</h2>
            <table className='w-full table-fixed'>
              <thead className='bg-gray-200'>
                <tr>
                  <th className="text-left p-3 w-2/3">Description</th>
                  <th className="text-right p-3 w-1/3</tr>">Amount</th>
                </tr>
              </thead>
              <tbody>
                {
                  invoice.details.length > 0 && (
                    <>
                      {
                        invoice.details.map((detail, index) => (
                          <tr key={index}>
                            <td className="p-3 text-sm">{detail.desc}</td>
                            <td className="p-3 text-right text-sm">{detail.amount}</td>
                          </tr>
                        ))
                      }
                      <tr>
                        <td className="text-right font-bold text-sm p-3 border-b">Sub Total</td>
                        <td className="text-right text-sm p-3 border-b">{invoice.subtotal}</td>
                      </tr>
                      <tr>
                        <td className="text-right font-bold text-sm p-3">Tax</td>
                        <td className="text-right text-sm p-3">{invoice.tax}</td>
                      </tr>
                      <tr>
                        <td className="text-right font-bold text-sm p-3">Discount</td>
                        <td className="text-right text-sm p-3">{invoice.discount}</td>
                      </tr>
                      <tr>
                        <td className="text-right font-bold text-sm p-3">Total</td>
                        <td className="text-right text-sm p-3">{invoice.total}</td>
                      </tr>
                    </>
                  )
                }
              </tbody>
            </table>
          </div>
        </div>
      </div >
    </Authenticated >
  )
}

export default Show;