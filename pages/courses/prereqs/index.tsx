import { GetStaticProps } from 'next'
import Head from 'next/head'
import { useState, useEffect } from 'react'
import Menu from '@/components/Menu'
import { PreReqGroup } from '@/types/PreReq'
import Modal from '@/components/Modal'

export const getStaticProps: GetStaticProps = async () => {
    const fs = require('fs')

    let prereqs = fs.readFileSync('./public/prereqs.json').toString()
    prereqs = JSON.parse(prereqs)

    return {
        props: {
            prereqs,
        },
    }
}

export default function Prereqs({ prereqs }: { prereqs: PreReqGroup[] }) {
    const [search, setSearch] = useState('')
    const [open, setOpen] = useState(false)
    const [prereq, setPrereq] = useState<PreReqGroup | null>(null)

    const toggleModal = () => {
        setOpen(!open)
    }

    return (
        <>
            <Head>
                <title>Prereqs.</title>
                <meta
                    name="description"
                    content="One stop place for your PS queries, handouts, and much more"
                />
                <meta
                    name="keywords"
                    content="BITS Pilani, Handouts, BPHC, Hyderabad Campus, BITS Hyderabad, BITS, Pilani, Handouts for you, handouts, for, you, bits, birla, institute, bits hyd, academics, practice school, ps, queries, ps cutoffs, ps2, ps1"
                />
                <meta name="robots" content="index, follow" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {/* Search box */}
            <div className="grid place-items-center">
                <div className="w-[70vw] place-items-center flex flex-col justify-between">
                    <h1 className="text-4xl pt-[50px] pb-[20px] px-[35px] text-primary">
                        Prereqs.
                    </h1>

                    <Menu />

                    <input
                        type="text"
                        placeholder="Search..."
                        className="input input-secondary w-full max-w-xs"
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            <p className="text-center m-2">
                NOTE: Here PRE means you will have to complete before hand while
                CO means you can do them parallelly
            </p>

            <div className="grid md:grid-cols-3 place-items-center p-5">
                <Modal open={open}>
                    <h3 className="font-bold text-lg">{prereq?.name}</h3>
                    <div className="card-actions justify-begin text-primary my-3">
                        {prereq && prereq.prereqs.length > 0 ? (
                            prereq.prereqs.map((preq) => (
                                <>
                                    <li key={preq.prereq_name}>
                                        {preq.prereq_name} ({preq.pre_cop})
                                    </li>
                                </>
                            ))
                        ) : (
                            <p>No Prerequisites</p>
                        )}
                        {prereq?.all_one && (
                            <>
                                Note: You will have to do{' '}
                                <b>{prereq?.all_one.toLowerCase()}</b> of the
                                above courses
                            </>
                        )}
                        <br />
                    </div>
                    <div className="modal-action">
                        <label
                            className="btn btn-primary"
                            onClick={() => toggleModal()}
                        >
                            Close
                        </label>
                    </div>
                </Modal>

                {prereqs
                    .filter((d: PreReqGroup) =>
                        d.name.toLowerCase().includes(search.toLowerCase())
                    )
                    .map((preqgroup: PreReqGroup) => (
                        <div
                            className="card w-11/12 bg-secondary text-neutral-content m-2 cursor-grab"
                            key={preqgroup.name}
                            onClick={() => {
                                toggleModal()
                                setPrereq(preqgroup)
                            }}
                        >
                            <div className="card-body items-center">
                                <h2 className="card-title text-primary">
                                    {preqgroup.name}
                                </h2>
                            </div>
                        </div>
                    ))}
            </div>
        </>
    )
}
